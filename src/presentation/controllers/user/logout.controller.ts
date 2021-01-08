import { Inject } from '@/shared/dependency-injection'
import { UserResponse } from '@/domain/protocols'
import { GetUserByAccessTokenUseCase, UpdateUserAccessTokenUseCase } from '@/domain/usecases/user'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { EntityNotFoundError } from '@/presentation/errors'
import { userWithoutPassword } from '@/domain/helpers/user.helper'
import { schema, string } from '@/domain/protocols/schema'
import { User } from '@/domain/entities'

@InjectableController()
export class LogoutController implements Controller<Pick<User, 'accessToken'>, UserResponse> {

  constructor (
    @Inject()
    private readonly getUserByAccessTokenUseCase: GetUserByAccessTokenUseCase,

    @Inject()
    private readonly updateUserAccessTokenUseCase: UpdateUserAccessTokenUseCase
  ) { }

  @HandleError
  @Validate({
    body: {
      schema: schema({
        accessToken: string().required()
      })
    }
  })
  async handle (request: HttpRequest<Pick<User, 'accessToken'>>): HandleResponse<UserResponse> {
    const { accessToken } = request.body as { accessToken: string }

    const findedUser = await this.getUserByAccessTokenUseCase.call(accessToken)
    if (!findedUser)
      return notFound(new EntityNotFoundError('User'))

    await this.updateUserAccessTokenUseCase.call(findedUser.id, undefined)

    findedUser.accessToken = undefined

    const findedUserWithoutPassword = userWithoutPassword(findedUser)

    return ok(findedUserWithoutPassword)
  }
}