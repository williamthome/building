import { Injectable } from '@/shared/dependency-injection'
import { Middleware, MiddlewareResponse } from '../protocols'
import { noContent, unauthorized } from '@/presentation/factories/http.factory'
import { HttpRequest } from '@/presentation/protocols'
import { HandleLogError } from '@/presentation/decorators'
import { CompanyRole } from '@/shared/constants'
import { hasPermission } from '../helpers/middleware.helper'

@Injectable()
export class CompanyRoleMiddleware implements Middleware {

  constructor (
    private readonly companyRole: CompanyRole | CompanyRole[]
  ) { }

  @HandleLogError
  async handle <T> (httpRequest: HttpRequest<T>): MiddlewareResponse {
    return hasPermission(httpRequest, this.companyRole)
      ? noContent()
      : unauthorized()
  }
}