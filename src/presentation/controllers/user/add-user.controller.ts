// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { ok } from '@/presentation/factories/http.factory'
import { userSchema } from '@/presentation/schemas'
import { ServerErrorHandler, ValidateRequest } from '@/presentation/decorators'
// < Out: only domain layer
import { UserEntity, userKeys } from '@/domain/entities'
import { AddUserUseCase } from '@/domain/usecases'
import { UserDto } from '@/domain/protocols'

@Injectable()
export class AddUserController implements Controller<UserEntity> {

  constructor (
    @Inject() private readonly addUserUseCase: AddUserUseCase
  ) { }

  @ValidateRequest<UserDto, UserEntity>({
    schema: userSchema,
    keys: userKeys,
    nullable: false
  })
  @ServerErrorHandler
  async handle (request: HttpRequest<UserDto>): HandleResponse<UserEntity> {
    const userDto = request.body as UserDto
    const newUser = await this.addUserUseCase.call(userDto)
    return ok(newUser)
  }
}