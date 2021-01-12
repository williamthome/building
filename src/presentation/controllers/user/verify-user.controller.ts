// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { badRequest, notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError, UserAlreadyVerifiedError } from '@/presentation/errors'
// < Out: only domain layer
import { User } from '@/domain/entities'
import { GetUserByIdUseCase, VerifyUserUseCase } from '@/domain/usecases'
import { UserResponse } from '@/domain/protocols'
import { Decrypter } from '@/domain/protocols/cryptography'
import { userWithoutPassword } from '@/domain/helpers/user.helper'
import { Schema, string } from '@/domain/protocols/schema'

@InjectableController({
  usesTransaction: true
})
export class VerifyUserController implements Controller<undefined, UserResponse> {
  constructor(
    @Inject()
    private readonly decrypter: Decrypter,

    @Inject()
    private readonly getUserByIdUseCase: GetUserByIdUseCase,

    @Inject()
    private readonly verifyUserUseCase: VerifyUserUseCase
  ) {}

  @HandleError
  @Validate({
    query: {
      schema: new Schema({
        token: string().required()
      })
    }
  })
  async handle(request: HttpRequest): HandleResponse<UserResponse> {
    const token = request.query?.token as string

    const requestUserId = await this.decrypter.decrypt(token)

    const findedUser = await this.getUserByIdUseCase.call(requestUserId)
    if (!findedUser) return notFound(new EntityNotFoundError('User'))

    if (findedUser.verified) return badRequest(new UserAlreadyVerifiedError())

    const findedUserVerified = (await this.verifyUserUseCase.call(requestUserId)) as User

    const findedUserWithoutPassword = userWithoutPassword(findedUserVerified)

    return ok(findedUserWithoutPassword)
  }
}
