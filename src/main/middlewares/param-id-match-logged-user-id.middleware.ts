import { Injectable } from '@/shared/dependency-injection'
import { Middleware, MiddlewareResponse } from '../protocols'
import { noContent, unauthorized } from '@/presentation/factories/http.factory'
import { HttpRequest } from '@/presentation/protocols'
import { HandleLogError } from '@/presentation/decorators'
import { UserEntity } from '@/domain/entities'

@Injectable()
export class ParamIdMatchLoggedUserIdMiddleware implements Middleware {
  @HandleLogError
  async handle <T> (httpRequest: HttpRequest<T>): MiddlewareResponse {
    const userId = httpRequest.params?.id as UserEntity['id']
    const loggedUserId = httpRequest.loggedUserInfo?.id as UserEntity['id']

    return userId === loggedUserId
      ? noContent()
      : unauthorized()
  }
}