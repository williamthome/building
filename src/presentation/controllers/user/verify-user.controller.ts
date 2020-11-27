// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { badRequest, notFound, ok } from '@/presentation/factories/http.factory'
import { HandleLogError, ValidateQuery } from '@/presentation/decorators'
import { EntityNotFoundError, UserAlreadyVerifiedError } from '@/presentation/errors'
import { isString, required } from '@/presentation/validations'
// < Out: only domain layer
import { UserEntity } from '@/domain/entities'
import { GetUserByIdUseCase, VerifyUserUseCase } from '@/domain/usecases'
import { UserEntityResponse } from '@/domain/protocols'
import { Decrypter } from '@/domain/protocols/cryptography'
import { userWithoutPassword } from '@/domain/helpers/user.helper'

@Injectable()
export class VerifyUserController implements Controller<undefined, UserEntityResponse> {

  constructor (
    @Inject() private readonly decrypter: Decrypter,
    @Inject() private readonly getUserByIdUseCase: GetUserByIdUseCase,
    @Inject() private readonly verifyUserUseCase: VerifyUserUseCase
  ) { }

  @ValidateQuery<undefined, UserEntityResponse>({
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
  async handle (request: HttpRequest): HandleResponse<UserEntityResponse> {
    const token = request.query?.token as string

    const userId = await this.decrypter.decrypt(token)

    let user = await this.getUserByIdUseCase.call(userId)
    if (!user)
      return notFound(new EntityNotFoundError('User'))

    if (user.verified)
      return badRequest(new UserAlreadyVerifiedError())

    user = await this.verifyUserUseCase.call(userId) as UserEntity

    return ok(userWithoutPassword(user))
  }
}