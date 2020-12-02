// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { badRequest, ok } from '@/presentation/factories/http.factory'
import { userSchema } from '@/presentation/schemas'
import { HandleError, Validate } from '@/presentation/decorators'
import { UserAlreadyRegisteredError } from '@/presentation/errors'
// < Out: only domain layer
import { userKeys } from '@/domain/entities'
import { AddUserUseCase, GetUserByEmailUseCase } from '@/domain/usecases'
import { UserVerificationToken, UserEntityDto } from '@/domain/protocols'

@Injectable()
export class AddUserController implements Controller<UserEntityDto, UserVerificationToken> {

  constructor (
    @Inject() private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    @Inject() private readonly addUserUseCase: AddUserUseCase
  ) { }

  @Validate<UserEntityDto, UserVerificationToken>({
    body: {
      schema: userSchema,
      keys: userKeys
    }
  })
  @HandleError
  async handle (request: HttpRequest<UserEntityDto>): HandleResponse<UserVerificationToken> {
    const requestUserDto = request.body as UserEntityDto

    const findedUser = await this.getUserByEmailUseCase.call(requestUserDto.email as string)
    if (findedUser)
      return badRequest(new UserAlreadyRegisteredError())

    const { user: createdUserWithoutPassword, verificationToken } = await this.addUserUseCase.call(requestUserDto)

    return ok({
      user: createdUserWithoutPassword,
      verificationToken
    })
  }
}