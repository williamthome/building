import { Inject } from 'heinjector'
// > In: presentation layer
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/factories/http.factory'
// < Out: only domain layer
import { UserEntity } from '@/domain/entities'
import { AddUserUseCase } from '@/domain/usecases/user'
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

  async handle(request: HttpRequest<Partial<Omit<UserEntity, 'id'>>>): Promise<HttpResponse<UserEntity | null | Error>> {
    try {
      const userDto = request.body as Partial<Omit<UserEntity, 'id'>>
      const newUser = await this.addUserUseCase.call(userDto)

      return ok(newUser)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}