// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { ok, notFound, badRequest } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError, UserAlreadyVerifiedError } from '@/presentation/errors'
// < Out: only domain layer
import { GetUserByEmailUseCase, ResendUserVerificationTokenUseCase } from '@/domain/usecases'
import { UserVerificationTokenResponse } from '@/domain/protocols'
import { Encrypter } from '@/domain/protocols/cryptography'
import { userWithoutPassword } from '@/domain/helpers/user.helper'
import { Schema, email } from '@/domain/protocols/schema'

@InjectableController()
export class ResendUserVerificationTokenController
  implements Controller<undefined, UserVerificationTokenResponse> {
  constructor(
    @Inject()
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,

    @Inject()
    private readonly resendUserVerificationTokenUseCase: ResendUserVerificationTokenUseCase,

    @Inject()
    private readonly encrypter: Encrypter
  ) {}

  @HandleError
  @Validate({
    query: {
      schema: new Schema({
        email: email().required()
      })
    }
  })
  async handle(request: HttpRequest): HandleResponse<UserVerificationTokenResponse> {
    const email = request.query?.email as string

    const findedUser = await this.getUserByEmailUseCase.call(email)
    if (!findedUser) return notFound(new EntityNotFoundError('User'))

    if (findedUser.verified) return badRequest(new UserAlreadyVerifiedError())

    const verificationToken = await this.encrypter.encrypt(findedUser.id)

    await this.resendUserVerificationTokenUseCase.call(email, verificationToken)

    const findedUserWithoutPassword = userWithoutPassword(findedUser)

    return ok({
      user: findedUserWithoutPassword,
      verificationToken: verificationToken
    })
  }
}
