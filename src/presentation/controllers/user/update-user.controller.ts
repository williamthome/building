// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { idParamKeys, idParamSchema, userSchema } from '@/presentation/schemas'
import { HandleLogError, ValidateBody, ValidateParams } from '@/presentation/decorators'
import { CanNotFindEntityError } from '@/presentation/errors'
// < Out: only domain layer
import { UserEntity, userKeys } from '@/domain/entities'
import { UpdateUserUseCase } from '@/domain/usecases'
import { UserDto } from '@/domain/protocols'

@Injectable()
export class UpdateUserController implements Controller<UserEntity> {

  constructor (
    @Inject() private readonly updateUserUseCase: UpdateUserUseCase
  ) { }

  @ValidateBody<UserDto, UserEntity>({
    schema: userSchema,
    keys: userKeys,
    nullable: true
  })
  @ValidateParams<UserDto, UserEntity>({
    schema: idParamSchema,
    keys: idParamKeys
  })
  @HandleLogError
  async handle (request: HttpRequest<UserDto>): HandleResponse<UserEntity> {
    const userId = request.params?.id as UserEntity['id']
    const userDto = request.body as UserDto

    const udpatedUser = await this.updateUserUseCase.call(userId, userDto)
    if (!udpatedUser)
      return notFound(new CanNotFindEntityError('User'))

    return ok(udpatedUser)
  }
}