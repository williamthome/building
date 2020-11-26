// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { badRequest, notFound, ok } from '@/presentation/factories/http.factory'
import { HandleLogError, ValidateQuery } from '@/presentation/decorators'
import { EntityNotFoundError, UserAlreadyVerifiedError } from '@/presentation/errors'
// < Out: only domain layer
import { UserEntity } from '@/domain/entities'
import { GetUserByIdUseCase, VerifyUserUseCase } from '@/domain/usecases'
import { isString, required } from '@/presentation/validations'
import { Decrypter } from '@/data/protocols/cryptography'

@Injectable()
export class VerifyUserController implements Controller<undefined, UserEntity> {

  constructor (
    @Inject() private readonly decrypter: Decrypter,
    @Inject() private readonly getUserByIdUseCase: GetUserByIdUseCase,
    @Inject() private readonly verifyUserUseCase: VerifyUserUseCase
  ) { }

  @ValidateQuery<undefined, UserEntity>({
    schema: {
      token: {
        validations: [
          required,
          isString
        ]
      }
    },
    keys: {
      token: 'token'
    }
  })
  @HandleLogError
  async handle (request: HttpRequest<undefined>): HandleResponse<UserEntity> {
    const token = request.query?.token as string

    const userId = await this.decrypter.decrypt(token)

    let user = await this.getUserByIdUseCase.call(userId)
    if (!user)
      return notFound(new EntityNotFoundError('User'))

    if (user.verified)
      return badRequest(new UserAlreadyVerifiedError())

    user = await this.verifyUserUseCase.call(userId)

    return ok(user)
  }
}