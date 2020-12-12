// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { UpdateUserUseCase } from '@/domain/usecases'
import { UpdateUserDto, User, userSchema } from '@/domain/entities'
import { UserResponse } from '@/domain/protocols'
import { userWithoutPassword } from '@/domain/helpers/user.helper'

@InjectableController()
export class UpdateUserController implements Controller<UpdateUserDto, UserResponse> {

  constructor (
    @Inject() private readonly updateUserUseCase: UpdateUserUseCase
  ) { }

  @HandleError
  @Validate({
    body: {
      schema: userSchema,
      options: {
        allKeys: false
      }
    }
  })
  async handle (request: HttpRequest<UpdateUserDto>): HandleResponse<UserResponse> {
    const loggedUserId = request.loggedUserInfo?.id as User['id']
    const updateUserDto = request.body as UpdateUserDto

    const findedUser = await this.updateUserUseCase.call(loggedUserId, updateUserDto)
    if (!findedUser)
      return notFound(new EntityNotFoundError('User'))

    const findedUserWithoutPassword = userWithoutPassword(findedUser)

    return ok(findedUserWithoutPassword)
  }
}