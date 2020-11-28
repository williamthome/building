import { Middleware, MiddlewareResponse } from '../protocols'
import { noContent, unauthorized } from '@/presentation/factories/http.factory'
import { HttpRequest } from '@/presentation/protocols'
import { HandleError } from '@/presentation/decorators'
import { CompanyRole } from '@/shared/constants'
import { hasPermission } from '../helpers/middleware.helper'

export class CompanyRoleMiddleware implements Middleware {

  constructor (
    private readonly companyRole: CompanyRole | CompanyRole[]
  ) { }

  @HandleError
  async handle <T> (httpRequest: HttpRequest<T>): MiddlewareResponse {
    return hasPermission(httpRequest, this.companyRole)
      ? noContent()
      : unauthorized()
  }
}