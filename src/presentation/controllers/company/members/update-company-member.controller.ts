// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
import { CompanyRole } from '@/shared/constants'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { badRequest, forbidden, notFound, ok } from '@/presentation/factories/http.factory'
import { idParamKeys, idParamSchema, memberSchema } from '@/presentation/schemas'
import { HandleError, Validate } from '@/presentation/decorators'
import {
  AccessDeniedError,
  CanNotAddMoreOwnesrError,
  CanNotModifyOwnerError,
  EntityNotFoundError,
  UserIsNotAMemberError
} from '@/presentation/errors'
// < Out: only domain layer
import { CompanyEntity } from '@/domain/entities'
import { UpdateCompanyMemberUseCase } from '@/domain/usecases'
import { MemberEntity, memberKeys } from '@/domain/entities/nested'
import { MemberEntityDto } from '@/domain/protocols'

@Injectable()
export class UpdateCompanyMemberController implements Controller<MemberEntityDto, CompanyEntity> {

  constructor (
    @Inject() private readonly updateCompanyMemberUseCase: UpdateCompanyMemberUseCase
  ) { }

  @Validate<MemberEntityDto, CompanyEntity>({
    body: {
      schema: memberSchema,
      keys: memberKeys,
      nullable: true
    },
    params: {
      schema: idParamSchema,
      keys: idParamKeys
    }
  })
  @HandleError
  async handle (request: HttpRequest<MemberEntityDto>): HandleResponse<CompanyEntity> {
    const loggedUserCompanyRole = request.loggedUserInfo?.companyRole
    const activeCompanyId = request.activeCompanyInfo?.id as CompanyEntity['id']
    const activeCompanyMembers = request.activeCompanyInfo?.members as MemberEntity[]
    const requestUserId = request.params?.id as MemberEntity['userId']
    const requestMemberDto = request.body as MemberEntityDto

    const requestUserAsMember = activeCompanyMembers.find(companyMember => requestUserId === companyMember.userId)
    if (!requestUserAsMember)
      return badRequest(new UserIsNotAMemberError())

    if (requestUserAsMember.companyRole === CompanyRole.owner)
      return forbidden(new CanNotModifyOwnerError())

    if (requestMemberDto.companyRole === CompanyRole.owner)
      return forbidden(new CanNotAddMoreOwnesrError())

    if (requestMemberDto.companyRole === CompanyRole.master &&
      loggedUserCompanyRole !== CompanyRole.master)
      return forbidden(new AccessDeniedError())

    const activeCompanyWithUpdatedMember = await this.updateCompanyMemberUseCase.call(
      activeCompanyId, requestUserId, requestMemberDto
    )
    if (!activeCompanyWithUpdatedMember)
      return notFound(new EntityNotFoundError('Company'))

    return ok(activeCompanyWithUpdatedMember)
  }
}