import { Injectable } from '@/shared/dependency-injection'
import { Middleware, MiddlewareResponse } from '../protocols'
import { noContent, unauthorized } from '@/presentation/factories/http.factory'
import { HttpRequest } from '@/presentation/protocols'
import { HandleLogError } from '@/presentation/decorators'
import { UserRole } from '@/shared/constants'

@Injectable()
export class RoleMiddleware implements Middleware {

  constructor (
    private readonly role: UserRole | UserRole[]
  ) { }

  @HandleLogError
  async handle <T> (httpRequest: HttpRequest<T>): MiddlewareResponse {
    const { loggedUserInfo } = httpRequest

    const roles = Array.isArray(this.role) ? this.role : [this.role]

    return loggedUserInfo && loggedUserInfo.role && roles.includes(loggedUserInfo.role)
      ? noContent()
      : unauthorized()
  }
}