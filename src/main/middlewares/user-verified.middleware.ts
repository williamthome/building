import { Injectable } from '@/shared/dependency-injection'
import { Middleware, MiddlewareResponse } from '../protocols'
import { HandleLogError } from '@/presentation/decorators'
import { HttpRequest } from '@/presentation/protocols'
import { badRequest, noContent} from '@/presentation/factories/http.factory'
import { UserNotVerifiedError } from '@/presentation/errors'

@Injectable()
export class UserVerifiedMiddleware implements Middleware {
  @HandleLogError
  async handle <T> (httpRequest: HttpRequest<T>): MiddlewareResponse {
    return httpRequest.loggedUserInfo?.verified
      ? noContent()
      : badRequest(new UserNotVerifiedError())
  }
}