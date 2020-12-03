// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { badRequest, notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, UsesTransaction, Validate } from '@/presentation/decorators'
import { EntityNotFoundError, UserAlreadyVerifiedError } from '@/presentation/errors'
import { isString, required } from '@/presentation/validations'
// < Out: only domain layer
import { UserEntity } from '@/domain/entities'
import { GetUserByIdUseCase, VerifyUserUseCase } from '@/domain/usecases'
import { UserEntityResponse } from '@/domain/protocols'
import { Decrypter } from '@/domain/protocols/cryptography'
import { userWithoutPassword } from '@/domain/helpers/user.helper'

@Injectable()
@UsesTransaction
export class VerifyUserController implements Controller<undefined, UserEntityResponse> {

  constructor (
    @Inject() private readonly decrypter: Decrypter,
    @Inject() private readonly getUserByIdUseCase: GetUserByIdUseCase,
    @Inject() private readonly verifyUserUseCase: VerifyUserUseCase
  ) { }

  @HandleError
  @Validate<undefined, UserEntityResponse>({
    query: {
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
    }
  })
  async handle (request: HttpRequest): HandleResponse<UserEntityResponse> {
    const requestToken = request.query?.token as string

    const requestUserId = await this.decrypter.decrypt(requestToken)

    const findedUser = await this.getUserByIdUseCase.call(requestUserId)
    if (!findedUser)
      return notFound(new EntityNotFoundError('User'))

    if (findedUser.verified)
      return badRequest(new UserAlreadyVerifiedError())

    const findedUserVerified = await this.verifyUserUseCase.call(requestUserId) as UserEntity

    const findedUserWithoutPassword = userWithoutPassword(findedUserVerified)

    return ok(findedUserWithoutPassword)
  }
}