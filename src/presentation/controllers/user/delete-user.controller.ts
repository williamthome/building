// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleLogError } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { UserEntity } from '@/domain/entities'
import { DeleteUserUseCase } from '@/domain/usecases'

@Injectable()
export class DeleteUserController implements Controller<undefined, UserEntity> {

  constructor (
    @Inject() private readonly deleteUserUseCase: DeleteUserUseCase
  ) { }

  @HandleLogError
  async handle (request: HttpRequest): HandleResponse<UserEntity> {
    const id = request.loggedUserInfo?.id as UserEntity['id']

    const user = await this.deleteUserUseCase.call(id)
    if (!user)
      return notFound(new EntityNotFoundError('User'))

    return ok(user)
  }
}