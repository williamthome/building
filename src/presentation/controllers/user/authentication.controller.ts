import { Inject, Injectable } from '@/shared/dependency-injection'
import { AuthDto, UserEntityResponse } from '@/domain/protocols'
import { GetUserByEmailUseCase, UpdateUserAccessTokenUseCase } from '@/domain/usecases/user'
import { HandleLogError, ValidateBody } from '@/presentation/decorators'
import { badRequest, notFound, ok } from '@/presentation/factories/http.factory'
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { authSchema } from '@/presentation/schemas'
import { Encrypter, HashComparer } from '@/data/protocols/cryptography'
import { EntityNotFoundError, PasswordDoNotMatchError } from '@/presentation/errors'
import { userWithoutPassword } from '@/domain/helpers/user.helper'

@Injectable()
export class AuthenticationController implements Controller<AuthDto, UserEntityResponse> {

  constructor (
    @Inject() private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    @Inject() private readonly hashComparer: HashComparer,
    @Inject() private readonly encrypter: Encrypter,
    @Inject() private readonly updateUserAccessTokenUseCase: UpdateUserAccessTokenUseCase
  ) { }

  @ValidateBody<AuthDto, UserEntityResponse>({
    schema: authSchema,
    keys: {
      email: 'email',
      password: 'password'
    }
  })
  @HandleLogError
  async handle (request: HttpRequest<AuthDto>): HandleResponse<UserEntityResponse> {
    const authDto = request.body as AuthDto
    const user = await this.getUserByEmailUseCase.call(authDto.email)

    if (!user)
      return notFound(new EntityNotFoundError('User'))

    const passwordMatch = await this.hashComparer.match(
      authDto.password,
      user.password
    )

    if (!passwordMatch)
      return badRequest(new PasswordDoNotMatchError())

    const accessToken = await this.encrypter.encrypt(user.id)

    await this.updateUserAccessTokenUseCase.call(user.id, accessToken)

    user.accessToken = accessToken

    return ok(userWithoutPassword(user))
  }
}