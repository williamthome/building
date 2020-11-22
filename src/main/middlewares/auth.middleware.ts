import { Inject, Injectable } from '@/shared/dependency-injection'
import { Middleware, MiddlewareResponse } from '../protocols'
import { HttpHeaderName } from '@/presentation/constants'
import { AccessDeniedError, CanNotFindEntityError } from '@/presentation/errors'
import { forbidden, notFound } from '@/presentation/factories/http.factory'
import { HttpRequest } from '@/presentation/protocols'
import { HandleLogError } from '@/presentation/decorators'
import { GetUserByAccessTokenUseCase } from '@/domain/usecases'
import { okMiddleware } from '../helpers/middleware.helper'

@Injectable()
export class AuthMiddleware implements Middleware {

  constructor (
    @Inject() private readonly getUserByAccessTokenUseCase: GetUserByAccessTokenUseCase
  ) { }

  @HandleLogError
  async handle <T> (httpRequest: HttpRequest<T>): MiddlewareResponse {
    const authorization: string | undefined =
      httpRequest.headers?.[HttpHeaderName.AUTHORIZATION] ||
      httpRequest.headers?.[HttpHeaderName.AUTHORIZATION.toLowerCase()]

    if (!authorization || !authorization.startsWith('Bearer '))
      return forbidden(new AccessDeniedError())

    const accessToken = authorization.substring(7)

    const user = await this.getUserByAccessTokenUseCase.call(accessToken)
    if (!user)
      return notFound(new CanNotFindEntityError('User'))

    return okMiddleware(
      httpRequest, {
        id: user.id
      }, {
        id: user.activeCompanyId
      }
    )
  }
}