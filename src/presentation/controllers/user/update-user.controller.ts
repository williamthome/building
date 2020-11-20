// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { badRequest, notFound, ok } from '@/presentation/factories/http.factory'
import { userSchema } from '@/presentation/schemas/user.schema'
import { ServerErrorHandler, ValidateRequest } from '@/presentation/decorators'
// < Out: only domain layer
import { UserEntity, userKeys } from '@/domain/entities'
import { UpdateUserUseCase } from '@/domain/usecases/user'
import { UserDto } from '@/domain/protocols'
import { CanNotFindEntityError } from '@/presentation/errors/can-not-find-entity.error'

@Injectable()
export class UpdateUserController implements Controller<UserEntity> {

  constructor (
    @Inject() private readonly updateUserUseCase: UpdateUserUseCase
  ) { }

  @ServerErrorHandler
  @ValidateRequest<UserDto, UserEntity>({
    schema: userSchema,
    keys: userKeys,
    nullable: true
  })
  async handle (request: HttpRequest<UserDto>): HandleResponse<UserEntity> {
    const id = request.params?.id

    if (!id)
      return badRequest(new Error('Id is required'))

    const userDto = request.body as UserDto
    const udpatedUser = await this.updateUserUseCase.call(id, userDto)

    if (!udpatedUser)
      return notFound(new CanNotFindEntityError('User'))

    return ok(udpatedUser)
  }
}