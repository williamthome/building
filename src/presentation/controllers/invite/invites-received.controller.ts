// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController } from '@/presentation/decorators'
// < Out: only domain layer
import { GetInvitesByUserEmailUseCase } from '@/domain/usecases'
import { User, Invite } from '@/domain/entities'

@InjectableController()
export class InvitesReceivedController implements Controller<undefined, Invite[]> {
  constructor(
    @Inject()
    private readonly getInvitesByUserEmailUseCase: GetInvitesByUserEmailUseCase
  ) {}

  @HandleError
  async handle(request: HttpRequest): HandleResponse<Invite[]> {
    const email = request.loggedUserInfo?.email as User['email']

    const invites = await this.getInvitesByUserEmailUseCase.call(email)

    return ok(invites)
  }
}
