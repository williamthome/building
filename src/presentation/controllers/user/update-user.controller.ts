// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { userSchema } from '@/presentation/schemas'
import { HandleError, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { UserEntity, userKeys } from '@/domain/entities'
import { UpdateUserUseCase } from '@/domain/usecases'
import { UserEntityDto, UserEntityResponse } from '@/domain/protocols'
import { userWithoutPassword } from '@/domain/helpers/user.helper'

@Injectable()
export class UpdateUserController implements Controller<UserEntityDto, UserEntityResponse> {

  constructor (
    @Inject() private readonly updateUserUseCase: UpdateUserUseCase
  ) { }

  @HandleError
  @Validate<UserEntityDto, UserEntityResponse>({
    body: {
      schema: userSchema,
      keys: userKeys,
      partialValidation: true
    }
  })
  async handle (request: HttpRequest<UserEntityDto>): HandleResponse<UserEntityResponse> {
    const loggedUserId = request.loggedUserInfo?.id as UserEntity['id']
    const requestUserDto = request.body as UserEntityDto

    const findedUser = await this.updateUserUseCase.call(loggedUserId, requestUserDto)
    if (!findedUser)
      return notFound(new EntityNotFoundError('User'))

    const findedUserWithoutPassword = userWithoutPassword(findedUser)

    return ok(findedUserWithoutPassword)
  }
}