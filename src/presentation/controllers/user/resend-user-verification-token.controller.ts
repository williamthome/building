// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { ok, notFound, badRequest } from '@/presentation/factories/http.factory'
import { HandleError, Validate } from '@/presentation/decorators'
import { EntityNotFoundError, UserAlreadyVerifiedError } from '@/presentation/errors'
import { isEmail, isString, required } from '@/presentation/validations'
// < Out: only domain layer
import { GetUserByEmailUseCase, ResendUserVerificationTokenUseCase } from '@/domain/usecases'
import { UserVerificationToken } from '@/domain/protocols'
import { Encrypter } from '@/domain/protocols/cryptography'
import { userWithoutPassword } from '@/domain/helpers/user.helper'

@Injectable()
export class ResendUserVerificationTokenController implements Controller<undefined, UserVerificationToken> {

  constructor (
    @Inject() private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    @Inject() private readonly resendUserVerificationTokenUseCase: ResendUserVerificationTokenUseCase,
    @Inject() private readonly encrypter: Encrypter
  ) { }

  @HandleError
  @Validate<undefined, UserVerificationToken>({
    query: {
      schema: {
        email: {
          validations: [
            required,
            isString,
            isEmail
          ]
        }
      },
      keys: {
        email: 'email'
      }
    }
  })
  async handle (request: HttpRequest): HandleResponse<UserVerificationToken> {
    const requestEmail = request.query?.email as string

    const findedUser = await this.getUserByEmailUseCase.call(requestEmail)
    if (!findedUser)
      return notFound(new EntityNotFoundError('User'))

    if (findedUser.verified)
      return badRequest(new UserAlreadyVerifiedError())

    const verificationToken = await this.encrypter.encrypt(findedUser.id)

    await this.resendUserVerificationTokenUseCase.call(requestEmail, verificationToken)

    const findedUserWithoutPassword = userWithoutPassword(findedUser)

    return ok({
      user: findedUserWithoutPassword,
      verificationToken: verificationToken
    })
  }
}