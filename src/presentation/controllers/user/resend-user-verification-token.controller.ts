// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { ok, notFound, badRequest } from '@/presentation/factories/http.factory'
import { HandleError, ValidateQuery } from '@/presentation/decorators'
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

  @ValidateQuery<undefined, UserVerificationToken>({
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
  })
  @HandleError
  async handle (request: HttpRequest): HandleResponse<UserVerificationToken> {
    const email = request.query?.email as string

    const user = await this.getUserByEmailUseCase.call(email)
    if (!user)
      return notFound(new EntityNotFoundError('User'))

    if (user.verified)
      return badRequest(new UserAlreadyVerifiedError())

    const verificationToken = await this.encrypter.encrypt(user.id)

    await this.resendUserVerificationTokenUseCase.call(email, verificationToken)

    return ok({
      user: userWithoutPassword(user),
      verificationToken
    })
  }
}