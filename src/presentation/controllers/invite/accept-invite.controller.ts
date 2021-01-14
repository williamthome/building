// : Shared
import { Inject } from '@/shared/dependency-injection'
import { CompanyRole } from '@/shared/constants'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { noContent, notFound, unauthorized } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { Invite, User } from '@/domain/entities'
import {
  DeleteInviteUseCase,
  AddCompanyMemberUseCase,
  GetUserByEmailUseCase
} from '@/domain/usecases'
import { idSchema } from '@/domain/protocols'

@InjectableController({
  usesTransaction: true
})
export class AcceptInviteController implements Controller<undefined, null> {
  constructor(
    @Inject() private readonly deleteInviteUseCase: DeleteInviteUseCase,

    @Inject() private readonly getUserByEmailUseCase: GetUserByEmailUseCase,

    @Inject() private readonly addCompanyMemberUseCase: AddCompanyMemberUseCase
  ) {}

  @HandleError
  @Validate({
    params: {
      schema: idSchema
    }
  })
  async handle(request: HttpRequest): HandleResponse {
    const loggedUserEmail = request.loggedUserInfo?.email as User['email']
    const inviteId = request.params?.id as Invite['id']

    const invite = await this.deleteInviteUseCase.call(inviteId)
    if (!invite) return notFound(new EntityNotFoundError('Invite'))

    const { to: email, companyId, features } = invite

    if (email !== loggedUserEmail) return unauthorized()

    const user = await this.getUserByEmailUseCase.call(email)
    if (!user) return notFound(new EntityNotFoundError('User'))

    const company = await this.addCompanyMemberUseCase.call(companyId, {
      userId: user.id,
      companyRole: CompanyRole.user,
      features
    })
    if (!company) return notFound(new EntityNotFoundError('Company'))

    return noContent()
  }
}
