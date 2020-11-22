import { Inject, Injectable } from '@/shared/dependency-injection'
import { Middleware, MiddlewareResponse } from '../protocols'
import { AccessDeniedError, CanNotFindEntityError } from '@/presentation/errors'
import { forbidden, notFound } from '@/presentation/factories/http.factory'
import { HttpRequest } from '@/presentation/protocols'
import { HandleLogError } from '@/presentation/decorators'
import { GetUserByAccessTokenUseCase } from '@/domain/usecases'
import { authorizationToken, okMiddleware } from '../helpers/middleware.helper'

@Injectable()
export class AuthMiddleware implements Middleware {

  constructor (
    @Inject() private readonly getUserByAccessTokenUseCase: GetUserByAccessTokenUseCase
  ) { }

  @HandleLogError
  async handle<T> (httpRequest: HttpRequest<T>): MiddlewareResponse {
    const accessToken = authorizationToken(httpRequest)
    if (!accessToken)
      return forbidden(new AccessDeniedError())

    const user = await this.getUserByAccessTokenUseCase.call(accessToken)
    if (!user)
      return notFound(new CanNotFindEntityError('User'))

    return okMiddleware(
      httpRequest,
      {
        loggedUserInfo: {
          id: user.id
        },
        activeCompanyInfo: {
          id: user.activeCompanyId
        }
      }
    )
  }
}