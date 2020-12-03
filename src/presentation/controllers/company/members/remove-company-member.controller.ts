// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { badRequest, forbidden, notFound, ok } from '@/presentation/factories/http.factory'
import { idParamKeys, idParamSchema } from '@/presentation/schemas'
import { HandleError, Validate } from '@/presentation/decorators'
import { CanNotDeleteOwnerError, EntityNotFoundError, UserIsNotAMemberError } from '@/presentation/errors'
// < Out: only domain layer
import { CompanyEntity } from '@/domain/entities'
import { GetUserByIdUseCase, RemoveCompanyMemberUseCase, UpdateUserActiveCompanyUseCase } from '@/domain/usecases'
import { MemberEntity } from '@/domain/entities/nested'
import { CompanyRole } from '@/shared/constants'

@Injectable()
export class RemoveCompanyMemberController implements Controller<undefined, CompanyEntity> {

  constructor (
    @Inject() private readonly getUserByIdUseCase: GetUserByIdUseCase,
    @Inject() private readonly removeCompanyMemberUseCase: RemoveCompanyMemberUseCase,
    @Inject() private readonly updateUserActiveCompanyUseCase: UpdateUserActiveCompanyUseCase
  ) { }

  @HandleError
  @Validate<undefined, CompanyEntity>({
    params: {
      schema: idParamSchema,
      keys: idParamKeys
    }
  })
  async handle (request: HttpRequest<undefined>): HandleResponse<CompanyEntity> {
    const activeCompanyId = request.activeCompanyInfo?.id as CompanyEntity['id']
    const activeCompanyMembers = request.activeCompanyInfo?.members as MemberEntity[]
    const requestUserId = request.params?.id as MemberEntity['userId']

    const requestUserAsMember = activeCompanyMembers.find(
      companyMember => requestUserId === companyMember.userId
    )
    if (!requestUserAsMember)
      return badRequest(new UserIsNotAMemberError())

    if (requestUserAsMember.companyRole === CompanyRole.owner)
      return forbidden(new CanNotDeleteOwnerError())

    const userRemovedFromMembers = await this.getUserByIdUseCase.call(requestUserId)
    if (!userRemovedFromMembers)
      return notFound(new EntityNotFoundError('User'))

    const activeCompanyWithoutUserAsMember = await this.removeCompanyMemberUseCase.call(activeCompanyId, requestUserId)

    if (userRemovedFromMembers.activeCompanyId === activeCompanyId)
      await this.updateUserActiveCompanyUseCase.call(requestUserId, undefined)

    return ok(activeCompanyWithoutUserAsMember)
  }
}