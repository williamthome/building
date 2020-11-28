import { Injectable } from '@/shared/dependency-injection'
import { Middleware, MiddlewareResponse } from '../protocols'
import { noContent, unauthorized } from '@/presentation/factories/http.factory'
import { HttpRequest } from '@/presentation/protocols'
import { HandleError } from '@/presentation/decorators'
import { CompanyEntity } from '@/domain/entities'

@Injectable()
export class ParamIdMatchActiveCompanyIdMiddleware implements Middleware {
  @HandleError
  async handle <T> (httpRequest: HttpRequest<T>): MiddlewareResponse {
    const companyId = httpRequest.params?.id as CompanyEntity['id']
    const activeCompanyId = httpRequest.activeCompanyInfo?.id as CompanyEntity['id']

    return companyId === activeCompanyId
      ? noContent()
      : unauthorized()
  }
}