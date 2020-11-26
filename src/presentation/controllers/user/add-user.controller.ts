// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { ok } from '@/presentation/factories/http.factory'
import { userSchema } from '@/presentation/schemas'
import { HandleLogError, ValidateBody } from '@/presentation/decorators'
// < Out: only domain layer
import { userKeys } from '@/domain/entities'
import { AddUserUseCase } from '@/domain/usecases'
import { AddUserResponse, UserDto } from '@/domain/protocols'

@Injectable()
export class AddUserController implements Controller<UserDto, AddUserResponse> {

  constructor (
    @Inject() private readonly addUserUseCase: AddUserUseCase
  ) { }

  @ValidateBody<UserDto, AddUserResponse>({
    schema: userSchema,
    keys: userKeys
  })
  @HandleLogError
  async handle (request: HttpRequest<UserDto>): HandleResponse<AddUserResponse> {
    const userDto = request.body as UserDto
    const newUser = await this.addUserUseCase.call(userDto)
    return ok(newUser)
  }
}