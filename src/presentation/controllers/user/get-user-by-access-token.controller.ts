// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { GetUserByAccessTokenUseCase } from '@/domain/usecases'
import { UserResponse } from '@/domain/protocols'
import { userWithoutPassword } from '@/domain/helpers/user.helper'
import { schema, string } from '@/domain/protocols/schema'

@InjectableController()
export class GetUserByAccessTokenController implements Controller<undefined, UserResponse> {

  constructor (
    @Inject()
    private readonly getUserByAccessTokenUseCase: GetUserByAccessTokenUseCase,
  ) { }

  @HandleError
  @Validate({
    query: {
      schema: schema({
        accessToken: string().required()
      })
    }
  })
  async handle (request: HttpRequest): HandleResponse<UserResponse> {
    const { accessToken } = request.query as { accessToken: string }

    const findedUser = await this.getUserByAccessTokenUseCase.call(accessToken)
    if (!findedUser)
      return notFound(new EntityNotFoundError('User'))

    const findedUserWithoutPassword = userWithoutPassword(findedUser)

    return ok(findedUserWithoutPassword)
  }
}