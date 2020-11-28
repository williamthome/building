// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
import { CompanyRole } from '@/shared/constants'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { badRequest, forbidden, notFound, ok } from '@/presentation/factories/http.factory'
import { idParamKeys, idParamSchema, memberSchema } from '@/presentation/schemas'
import { HandleError, ValidateBody, ValidateParams } from '@/presentation/decorators'
import { AccessDeniedError, EntityNotFoundError, UserIsNotAMemberError } from '@/presentation/errors'
// < Out: only domain layer
import { CompanyEntity } from '@/domain/entities'
import { UpdateCompanyMemberUseCase } from '@/domain/usecases'
import { MemberEntity, memberKeys } from '@/domain/entities/nested'
import { MemberDto } from '@/domain/protocols'

@Injectable()
export class UpdateCompanyMemberController implements Controller<MemberDto, CompanyEntity> {

  constructor (
    @Inject() private readonly updateCompanyMemberUseCase: UpdateCompanyMemberUseCase
  ) { }

  @ValidateBody<MemberDto, CompanyEntity>({
    schema: memberSchema,
    keys: memberKeys,
    nullable: true
  })
  @ValidateParams<MemberDto, CompanyEntity>({
    schema: idParamSchema,
    keys: idParamKeys
  })
  @HandleError
  async handle (request: HttpRequest<MemberDto>): HandleResponse<CompanyEntity> {
    const companyId = request.activeCompanyInfo?.id as CompanyEntity['id']
    const members = request.activeCompanyInfo?.members as MemberEntity[]
    const userId = request.params?.id as MemberEntity['userId']
    const memberDto = request.body as MemberDto

    const member = members.find(companyMember => userId === companyMember.userId)
    if (!member)
      return badRequest(new UserIsNotAMemberError())

    if (member.companyRole === CompanyRole.owner)
      return forbidden(new AccessDeniedError())

    const updatedCompany = await this.updateCompanyMemberUseCase.call(companyId, userId, memberDto)
    if (!updatedCompany)
      return notFound(new EntityNotFoundError('Company'))

    return ok(updatedCompany)
  }
}