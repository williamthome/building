import { Injectable } from '@/shared/dependency-injection'
import { Middleware, MiddlewareResponse } from '../protocols'
import { HandleError } from '@/presentation/decorators'
import { HttpRequest } from '@/presentation/protocols'
import { badRequest, noContent} from '@/presentation/factories/http.factory'
import { UserNotVerifiedError } from '@/presentation/errors'

@Injectable()
export class UserVerifiedMiddleware implements Middleware {
  @HandleError
  async handle <T> (httpRequest: HttpRequest<T>): MiddlewareResponse {
    return httpRequest.loggedUserInfo?.verified
      ? noContent()
      : badRequest(new UserNotVerifiedError())
  }
}