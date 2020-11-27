// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { badRequest, ok } from '@/presentation/factories/http.factory'
import { userSchema } from '@/presentation/schemas'
import { HandleLogError, ValidateBody } from '@/presentation/decorators'
import { UserAlreadyRegisteredError } from '@/presentation/errors'
// < Out: only domain layer
import { userKeys } from '@/domain/entities'
import { AddUserUseCase, GetUserByEmailUseCase } from '@/domain/usecases'
import { UserVerificationToken, UserDto } from '@/domain/protocols'

@Injectable()
export class AddUserController implements Controller<UserDto, UserVerificationToken> {

  constructor (
    @Inject() private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    @Inject() private readonly addUserUseCase: AddUserUseCase
  ) { }

  @ValidateBody<UserDto, UserVerificationToken>({
    schema: userSchema,
    keys: userKeys
  })
  @HandleLogError
  async handle (request: HttpRequest<UserDto>): HandleResponse<UserVerificationToken> {
    const userDto = request.body as UserDto

    const user = await this.getUserByEmailUseCase.call(userDto.email as string)
    if (user)
      return badRequest(new UserAlreadyRegisteredError())

    const { user: userWithoutPassword, verificationToken } = await this.addUserUseCase.call(userDto)
    return ok({
      user: userWithoutPassword,
      verificationToken
    })
  }
}