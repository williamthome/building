import { Inject } from '@/shared/dependency-injection'
import { AuthEntityDto, UserEntityResponse } from '@/domain/protocols'
import { GetUserByEmailUseCase, UpdateUserAccessTokenUseCase } from '@/domain/usecases/user'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { badRequest, notFound, ok } from '@/presentation/factories/http.factory'
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { authSchema } from '@/presentation/schemas'
import { EntityNotFoundError, PasswordDoNotMatchError } from '@/presentation/errors'
import { userWithoutPassword } from '@/domain/helpers/user.helper'
import { Encrypter, HashComparer } from '@/domain/protocols/cryptography'

@InjectableController()
export class AuthenticationController implements Controller<AuthEntityDto, UserEntityResponse> {

  constructor (
    @Inject() private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    @Inject() private readonly hashComparer: HashComparer,
    @Inject() private readonly encrypter: Encrypter,
    @Inject() private readonly updateUserAccessTokenUseCase: UpdateUserAccessTokenUseCase
  ) { }

  @HandleError
  @Validate<AuthEntityDto, UserEntityResponse>({
    body: {
      schema: authSchema,
      keys: {
        email: 'email',
        password: 'password'
      }
    }
  })
  async handle (request: HttpRequest<AuthEntityDto>): HandleResponse<UserEntityResponse> {
    const requestAuthDto = request.body as AuthEntityDto

    const findedUser = await this.getUserByEmailUseCase.call(requestAuthDto.email)
    if (!findedUser)
      return notFound(new EntityNotFoundError('User'))

    const passwordMatch = await this.hashComparer.match(
      requestAuthDto.password,
      findedUser.password
    )
    if (!passwordMatch)
      return badRequest(new PasswordDoNotMatchError())

    const accessToken = await this.encrypter.encrypt(findedUser.id)

    await this.updateUserAccessTokenUseCase.call(findedUser.id, accessToken)

    findedUser.accessToken = accessToken

    const authenticatedUserWithoutPassword = userWithoutPassword(findedUser)

    return ok(authenticatedUserWithoutPassword)
  }
}