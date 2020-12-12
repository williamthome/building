import { Inject } from '@/shared/dependency-injection'
import { UserResponse } from '@/domain/protocols'
import { GetUserByEmailUseCase, UpdateUserAccessTokenUseCase } from '@/domain/usecases/user'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { badRequest, notFound, ok } from '@/presentation/factories/http.factory'
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { EntityNotFoundError, PasswordDoNotMatchError } from '@/presentation/errors'
import { userWithoutPassword } from '@/domain/helpers/user.helper'
import { Encrypter, HashComparer } from '@/domain/protocols/cryptography'
import { Authentication, authenticationSchema } from '@/domain/entities'

@InjectableController()
export class AuthenticationController implements Controller<Authentication, UserResponse> {

  constructor (
    @Inject()
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,

    @Inject()
    private readonly hashComparer: HashComparer,

    @Inject()
    private readonly encrypter: Encrypter,

    @Inject()
    private readonly updateUserAccessTokenUseCase: UpdateUserAccessTokenUseCase
  ) { }

  @HandleError
  @Validate({
    body: {
      schema: authenticationSchema
    }
  })
  async handle (request: HttpRequest<Authentication>): HandleResponse<UserResponse> {
    const authentication = request.body as Authentication

    const findedUser = await this.getUserByEmailUseCase.call(authentication.email)
    if (!findedUser)
      return notFound(new EntityNotFoundError('User'))

    const passwordMatch = await this.hashComparer.match(
      authentication.password,
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