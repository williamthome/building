import { Inject, Injectable } from '@/shared/dependency-injection'
import { Middleware, MiddlewareResponse } from '../protocols'
import { EntityNotFoundError } from '@/presentation/errors'
import { notFound, unauthorized } from '@/presentation/factories/http.factory'
import { HttpRequest } from '@/presentation/protocols'
import { HandleError } from '@/presentation/decorators'
import { GetUserByAccessTokenUseCase } from '@/domain/usecases'
import { okMiddleware } from '../helpers/middleware.helper'

@Injectable()
export class AuthMiddleware implements Middleware {
  constructor(
    @Inject() private readonly getUserByAccessTokenUseCase: GetUserByAccessTokenUseCase
  ) {}

  @HandleError
  async handle<T>(httpRequest: HttpRequest<T>): MiddlewareResponse {
    const accessToken = httpRequest.cookies?.find((cookie) => cookie.name === 'accessToken')?.value
    if (!accessToken) return unauthorized()

    const user = await this.getUserByAccessTokenUseCase.call(accessToken)
    if (!user) return notFound(new EntityNotFoundError('User'))

    const { id, verified, activeCompanyId, email } = user

    return okMiddleware(httpRequest, {
      loggedUserInfo: {
        id,
        verified,
        activeCompanyId,
        email
      }
    })
  }
}
