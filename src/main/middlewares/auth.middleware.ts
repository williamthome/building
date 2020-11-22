import { Inject, Injectable } from '@/shared/dependency-injection'
import { Middleware } from '../protocols'
import { HttpHeaderName } from '@/presentation/constants'
import { AccessDeniedError, CanNotFindEntityError } from '@/presentation/errors'
import { forbidden, notFound, ok } from '@/presentation/factories/http.factory'
import { HandleResponse, HttpRequest, LoggedUserInfo } from '@/presentation/protocols'
import { ServerErrorHandler } from '@/presentation/decorators'
import { GetUserByAccessTokenUseCase } from '@/domain/usecases'

@Injectable()
export class AuthMiddleware implements Middleware {

  constructor (
    @Inject() private readonly getUserByAccessTokenUseCase: GetUserByAccessTokenUseCase
  ) { }

  @ServerErrorHandler
  async handle (httpRequest: HttpRequest): HandleResponse<LoggedUserInfo> {
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
  }
}