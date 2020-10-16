import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/factories/http.factory'
import { UserEntity } from '@/domain/entities/user.entity'
import { AddUserUseCase } from '@/domain/usecases/user/add-user.usecase'

export class AddUserController implements Controller<UserEntity> {

  constructor (private readonly addUser: AddUserUseCase) { }

  handle = async (request: HttpRequest<Partial<UserEntity>>): Promise<HttpResponse<UserEntity | Error>> => {
    try {
      const userDto = request.body!
      const newUser = await this.addUser.call(userDto)

      return ok(newUser)
    } catch (error) {
      return serverError(error)
    }
  }
}