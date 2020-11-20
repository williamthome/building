import { GetUserByAccessTokenUseCase } from '@/domain/usecases'
import { Inject, Injectable } from '@/shared/dependency-injection'
import { HttpHeaderName } from '../constants'
import { AccessDeniedError, CanNotFindEntityError } from '../errors'
import { forbidden, notFound, ok, serverError } from '../factories/http.factory'
import { HttpRequest, HttpResponse, LoggedUserInfo, Middleware } from '../protocols'

@Injectable()
export class AuthMiddleware implements Middleware {

  constructor (
    @Inject() private readonly getUserByAccessTokenUseCase: GetUserByAccessTokenUseCase
  ) { }

  handle = async (httpRequest: HttpRequest): Promise<HttpResponse<LoggedUserInfo | Error>> => {
    try {
      const bearer: string | undefined =
        httpRequest.headers?.[HttpHeaderName.AUTHORIZATION] ||
        httpRequest.headers?.[HttpHeaderName.AUTHORIZATION.toLowerCase()]

      if (!bearer || !bearer.startsWith('Bearer '))
        return forbidden(new AccessDeniedError())

      const accessToken = bearer.substring(7)

      const user = await this.getUserByAccessTokenUseCase.call(accessToken)
      if (!user)
        return notFound(new CanNotFindEntityError('User'))

      const { id, activeCompanyId } = user

      return ok({
        id,
        activeCompanyId
      })
    } catch (error) {
      return serverError(error)
    }
  }
}