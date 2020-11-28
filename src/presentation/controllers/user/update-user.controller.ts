// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { userSchema } from '@/presentation/schemas'
import { HandleError, ValidateBody } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { UserEntity, userKeys } from '@/domain/entities'
import { UpdateUserUseCase } from '@/domain/usecases'
import { UserDto, UserEntityResponse } from '@/domain/protocols'
import { userWithoutPassword } from '@/domain/helpers/user.helper'

@Injectable()
export class UpdateUserController implements Controller<UserDto, UserEntityResponse> {

  constructor (
    @Inject() private readonly updateUserUseCase: UpdateUserUseCase
  ) { }

  @ValidateBody<UserDto, UserEntityResponse>({
    schema: userSchema,
    keys: userKeys,
    nullable: true
  })
  @HandleError
  async handle (request: HttpRequest<UserDto>): HandleResponse<UserEntityResponse> {
    const userId = request.loggedUserInfo?.id as UserEntity['id']
    const userDto = request.body as UserDto

    const user = await this.updateUserUseCase.call(userId, userDto)
    if (!user)
      return notFound(new EntityNotFoundError('User'))

    return ok(userWithoutPassword(user))
  }
}