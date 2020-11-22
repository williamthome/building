// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { badRequest, notFound, ok } from '@/presentation/factories/http.factory'
import { userSchema } from '@/presentation/schemas'
import { HandleLogError, ValidateRequest } from '@/presentation/decorators'
import { CanNotFindEntityError, MissingParamError } from '@/presentation/errors'
// < Out: only domain layer
import { UserEntity, userKeys } from '@/domain/entities'
import { UpdateUserUseCase } from '@/domain/usecases'
import { UserDto } from '@/domain/protocols'

@Injectable()
export class UpdateUserController implements Controller<UserEntity> {

  constructor (
    @Inject() private readonly updateUserUseCase: UpdateUserUseCase
  ) { }

  @ValidateRequest<UserDto, UserEntity>({
    schema: userSchema,
    keys: userKeys,
    nullable: true
  })
  @HandleLogError
  async handle (request: HttpRequest<UserDto>): HandleResponse<UserEntity> {
    const id = request.params?.id

    if (!id)
      return badRequest(new MissingParamError('id'))

    const userDto = request.body as UserDto
    const udpatedUser = await this.updateUserUseCase.call(id, userDto)

    if (!udpatedUser)
      return notFound(new CanNotFindEntityError('User'))

    return ok(udpatedUser)
  }
}