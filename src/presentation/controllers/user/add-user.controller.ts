import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/factories/http.factory'
import { UserEntity } from '@/domain/entities'
import { AddUserUseCase } from '@/domain/usecases/user'
import { EntityDto } from '@/domain/protocols'

export class AddUserController implements Controller<UserEntity> {

  constructor (private readonly addUser: AddUserUseCase) { }

  handle = async (request: HttpRequest<EntityDto<UserEntity>>): Promise<HttpResponse<UserEntity | Error>> => {
    try {
      const userDto = request.body as EntityDto<UserEntity>
      const newUser = await this.addUser.call(userDto)

      return ok(newUser)
    } catch (error) {
      return serverError(error)
    }
  }
}