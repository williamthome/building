import { Inject, Injectable } from '@/shared/dependency-injection'
import { UserEntity } from '@/domain/entities'
import { AuthDto } from '@/domain/protocols'
import { GetUserByEmailUseCase } from '@/domain/usecases/user'
import { ServerErrorHandler, ValidateRequest } from '@/presentation/decorators'
import { badRequest, ok } from '@/presentation/factories/http.factory'
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { authSchema } from '@/presentation/schemas'
import { HashComparer } from '@/data/protocols/cryptography'
import { CanNotFindEntityError, PasswordDoNotMatchError } from '@/presentation/errors'

@Injectable()
export class AuthenticationController implements Controller<UserEntity> {

  constructor (
    @Inject() private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    @Inject() private readonly hashComparer: HashComparer
  ) { }

  @ServerErrorHandler
  @ValidateRequest<AuthDto, UserEntity>({
    schema: authSchema,
    keys: {
      email: 'email',
      password: 'password'
    },
    nullable: false
  })
  async handle (request: HttpRequest<AuthDto>): HandleResponse<UserEntity> {
    const authDto = request.body as AuthDto
    const user = await this.getUserByEmailUseCase.call(authDto.email)

    if (!user)
      return badRequest(new CanNotFindEntityError('User'))

    const passwordMatch = await this.hashComparer.match(
      authDto.password,
      user.password
    )

    if (!passwordMatch)
      return badRequest(new PasswordDoNotMatchError())

    return ok(user)
  }
}