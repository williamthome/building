// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { ok, notFound, badRequest } from '@/presentation/factories/http.factory'
import { HandleLogError, ValidateQuery } from '@/presentation/decorators'
import { EntityNotFoundError, UserAlreadyVerifiedError } from '@/presentation/errors'
import { isEmail, isString, required } from '@/presentation/validations'
// < Out: only domain layer
import { GetUserByEmailUseCase, ResendUserVerificationTokenUseCase } from '@/domain/usecases'
import { AddUserResponse } from '@/domain/protocols'

// !! ONLY DATA LAYER ""
import { Encrypter } from '@/data/protocols/cryptography'

@Injectable()
export class ResendUserVerificationTokenController implements Controller<undefined, AddUserResponse> {

  constructor (
    @Inject() private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    @Inject() private readonly resendUserVerificationTokenUseCase: ResendUserVerificationTokenUseCase,
    @Inject() private readonly encrypter: Encrypter
  ) { }

  @ValidateQuery<undefined, AddUserResponse>({
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
  @HandleLogError
  async handle (request: HttpRequest): HandleResponse<AddUserResponse> {
    const email = request.query?.email as string

    const user = await this.getUserByEmailUseCase.call(email)
    if (!user)
      return notFound(new EntityNotFoundError('User'))

    if (user.verified)
      return badRequest(new UserAlreadyVerifiedError())

    const verificationToken = await this.encrypter.encrypt(user.id)

    await this.resendUserVerificationTokenUseCase.call(email, verificationToken)

    return ok({
      user,
      verificationToken
    })
  }
}