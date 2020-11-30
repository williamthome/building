import { Inject, Injectable } from '@/shared/dependency-injection'
import { AuthEntityDto, UserEntityResponse } from '@/domain/protocols'
import { GetUserByEmailUseCase, UpdateUserAccessTokenUseCase } from '@/domain/usecases/user'
import { HandleError, ValidateBody } from '@/presentation/decorators'
import { badRequest, notFound, ok } from '@/presentation/factories/http.factory'
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { authSchema } from '@/presentation/schemas'
import { EntityNotFoundError, PasswordDoNotMatchError } from '@/presentation/errors'
import { userWithoutPassword } from '@/domain/helpers/user.helper'
import { Encrypter, HashComparer } from '@/domain/protocols/cryptography'

@Injectable()
export class AuthenticationController implements Controller<AuthEntityDto, UserEntityResponse> {

  constructor (
    @Inject() private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    @Inject() private readonly hashComparer: HashComparer,
    @Inject() private readonly encrypter: Encrypter,
    @Inject() private readonly updateUserAccessTokenUseCase: UpdateUserAccessTokenUseCase
  ) { }

  @ValidateBody<AuthEntityDto, UserEntityResponse>({
    schema: authSchema,
    keys: {
      email: 'email',
      password: 'password'
    }
  })
  @HandleError
  async handle (request: HttpRequest<AuthEntityDto>): HandleResponse<UserEntityResponse> {
    const authDto = request.body as AuthEntityDto
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