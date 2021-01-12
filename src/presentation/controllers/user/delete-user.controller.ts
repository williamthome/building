// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { User } from '@/domain/entities'
import { DeleteUserUseCase } from '@/domain/usecases'
import { UserResponse } from '@/domain/protocols'
import { userWithoutPassword } from '@/domain/helpers/user.helper'

@InjectableController({
  usesTransaction: true
})
export class DeleteUserController implements Controller<undefined, UserResponse> {
  constructor(@Inject() private readonly deleteUserUseCase: DeleteUserUseCase) {}

  @HandleError
  async handle(request: HttpRequest): HandleResponse<UserResponse> {
    const loggedUserId = request.loggedUserInfo?.id as User['id']

    const deletedUser = await this.deleteUserUseCase.call(loggedUserId)
    if (!deletedUser) return notFound(new EntityNotFoundError('User'))

    const deletedUserWithoutPassword = userWithoutPassword(deletedUser)

    return ok(deletedUserWithoutPassword)
  }
}
