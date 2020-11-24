import { Inject, Injectable } from '@/shared/dependency-injection'
import { UserEntity } from '@/domain/entities'
import { AuthDto } from '@/domain/protocols'
import { GetUserByEmailUseCase, UpdateUserAccessTokenUseCase } from '@/domain/usecases/user'
import { HandleLogError, ValidateBody } from '@/presentation/decorators'
import { badRequest, notFound, ok } from '@/presentation/factories/http.factory'
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { authSchema } from '@/presentation/schemas'
import { Encrypter, HashComparer } from '@/data/protocols/cryptography'
import { CanNotFindEntityError, PasswordDoNotMatchError } from '@/presentation/errors'

@Injectable()
export class AuthenticationController implements Controller<UserEntity> {

  constructor (
    @Inject() private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    @Inject() private readonly hashComparer: HashComparer,
    @Inject() private readonly encrypter: Encrypter,
    @Inject() private readonly updateUserAccessTokenUseCase: UpdateUserAccessTokenUseCase
  ) { }

  @ValidateBody<AuthDto, UserEntity>({
    schema: authSchema,
    keys: {
      email: 'email',
      password: 'password'
    }
  })
  @HandleLogError
  async handle (request: HttpRequest<AuthDto>): HandleResponse<UserEntity> {
    const authDto = request.body as AuthDto
    const user = await this.getUserByEmailUseCase.call(authDto.email)

    if (!user)
      return notFound(new CanNotFindEntityError('User'))

    const passwordMatch = await this.hashComparer.match(
      authDto.password,
      user.password
    )

    if (!passwordMatch)
      return badRequest(new PasswordDoNotMatchError())

    const accessToken = await this.encrypter.encrypt(user.id)

    await this.updateUserAccessTokenUseCase.call(user.id, accessToken)

    user.accessToken = accessToken

    return ok(user)
  }
}