// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { noContent, notFound, unauthorized } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { Invite, User } from '@/domain/entities'
import { DeleteInviteUseCase } from '@/domain/usecases'
import { idSchema } from '@/domain/protocols'

@InjectableController({
  usesTransaction: true
})
export class DeclineInviteController implements Controller<undefined, null> {
  constructor(@Inject() private readonly deleteInviteUseCase: DeleteInviteUseCase) {}

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

    if (invite.to !== loggedUserEmail) return unauthorized()

    return noContent()
  }
}
