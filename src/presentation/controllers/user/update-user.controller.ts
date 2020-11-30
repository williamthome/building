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
import { UserEntityDto, UserEntityResponse } from '@/domain/protocols'
import { userWithoutPassword } from '@/domain/helpers/user.helper'

@Injectable()
export class UpdateUserController implements Controller<UserEntityDto, UserEntityResponse> {

  constructor (
    @Inject() private readonly updateUserUseCase: UpdateUserUseCase
  ) { }

  @ValidateBody<UserEntityDto, UserEntityResponse>({
    schema: userSchema,
    keys: userKeys,
    nullable: true
  })
  @HandleError
  async handle (request: HttpRequest<UserEntityDto>): HandleResponse<UserEntityResponse> {
    const userId = request.loggedUserInfo?.id as UserEntity['id']
    const userDto = request.body as UserEntityDto

    const user = await this.updateUserUseCase.call(userId, userDto)
    if (!user)
      return notFound(new EntityNotFoundError('User'))

    return ok(userWithoutPassword(user))
  }
}