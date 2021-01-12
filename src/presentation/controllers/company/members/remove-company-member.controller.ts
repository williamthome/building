// : Shared
import { Inject } from '@/shared/dependency-injection'
import { CompanyRole } from '@/shared/constants'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { badRequest, forbidden, notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import {
  CanNotDeleteOwnerError,
  EntityNotFoundError,
  UserIsNotAMemberError
} from '@/presentation/errors'
// < Out: only domain layer
import {
  GetUserByIdUseCase,
  RemoveCompanyMemberUseCase,
  UpdateUserActiveCompanyUseCase
} from '@/domain/usecases'
import { Company } from '@/domain/entities'
import { Member } from '@/domain/entities/nested'
import { Schema, string } from '@/domain/protocols/schema'

@InjectableController()
export class RemoveCompanyMemberController implements Controller<undefined, Company> {
  constructor(
    @Inject()
    private readonly getUserByIdUseCase: GetUserByIdUseCase,

    @Inject()
    private readonly removeCompanyMemberUseCase: RemoveCompanyMemberUseCase,

    @Inject()
    private readonly updateUserActiveCompanyUseCase: UpdateUserActiveCompanyUseCase
  ) {}

  @HandleError
  @Validate({
    params: {
      schema: new Schema({
        id: string().required()
      })
    }
  })
  async handle(request: HttpRequest<undefined>): HandleResponse<Company> {
    const activeCompanyId = request.activeCompanyInfo?.id as Company['id']
    const activeCompanyMembers = request.activeCompanyInfo?.members as Member[]
    const userIdToRemove = request.params?.id as Member['userId']

    const memberToRemove = activeCompanyMembers.find(
      (companyMember) => userIdToRemove === companyMember.userId
    )
    if (!memberToRemove) return badRequest(new UserIsNotAMemberError())

    if (memberToRemove.companyRole === CompanyRole.owner)
      return forbidden(new CanNotDeleteOwnerError())

    const removedUserFromMembers = await this.getUserByIdUseCase.call(userIdToRemove)
    if (!removedUserFromMembers) return notFound(new EntityNotFoundError('User'))

    const activeCompanyWithoutMember = await this.removeCompanyMemberUseCase.call(
      activeCompanyId,
      userIdToRemove
    )

    if (removedUserFromMembers.activeCompanyId === activeCompanyId)
      await this.updateUserActiveCompanyUseCase.call(userIdToRemove, undefined)

    return ok(activeCompanyWithoutMember)
  }
}
