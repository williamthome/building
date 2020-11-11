// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/factories/http.factory'
import { userSchema } from '@/presentation/schemas/user.schema'
import { InjectableController, ValidateRequest } from '@/presentation/decorators'
// < Out: only domain layer
import { UserEntity, userKeys } from '@/domain/entities'
import { AddUserUseCase } from '@/domain/usecases/user'
import { AddUserDto } from '@/domain/protocols'

@InjectableController<UserEntity>({
  method: 'POST',
  path: '/user',
  requirement: 'none'
})
export class AddUserController implements Controller<UserEntity> {

  constructor (
    @Inject() private readonly addUserUseCase: AddUserUseCase
  ) { }

  @ValidateRequest<AddUserDto, UserEntity>({
    schema: userSchema,
    keys: userKeys,
    nullable: false
  })
  async handle(request: HttpRequest<AddUserDto>): HandleResponse<UserEntity> {
    try {
      const userDto = request.body as AddUserDto
      const newUser = await this.addUserUseCase.call(userDto)

      return ok(newUser)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}