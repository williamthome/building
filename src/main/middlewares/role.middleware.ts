import { Injectable } from '@/shared/dependency-injection'
import { Middleware, MiddlewareResponse } from '../protocols'
import { noContent, unauthorized } from '@/presentation/factories/http.factory'
import { HttpRequest } from '@/presentation/protocols'
import { HandleLogError } from '@/presentation/decorators'
import { UserRole } from '@/shared/constants'
import { hasPermission } from '../helpers/middleware.helper'

@Injectable()
export class RoleMiddleware implements Middleware {

  constructor (
    private readonly role: UserRole | UserRole[]
  ) { }

  @HandleLogError
  async handle <T> (httpRequest: HttpRequest<T>): MiddlewareResponse {
    return hasPermission(httpRequest, this.role)
      ? noContent()
      : unauthorized()
  }
}