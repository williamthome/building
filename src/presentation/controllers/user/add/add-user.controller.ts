import { Inject } from 'heinjector'
// > In: presentation layer
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/factories/http.factory'
// < Out: only domain layer
import { UserEntity } from '@/domain/entities'
import { AddUserUseCase } from '@/domain/usecases/user'
import { EntityDto } from '@/domain/protocols'
import { InjectableController } from '@/presentation/decorators'

@InjectableController<UserEntity>({
  method: 'POST',
  path: '/user',
  requirement: 'none'
})
export class AddUserController implements Controller<UserEntity> {

  constructor (
    @Inject() private readonly addUserUseCase: AddUserUseCase
  ) { }

  handle = async (request: HttpRequest<EntityDto<UserEntity>>): Promise<HttpResponse<UserEntity | Error>> => {
    try {
      const userDto = request.body as EntityDto<UserEntity>
      const newUser = await this.addUserUseCase.call(userDto)

      return ok(newUser)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}