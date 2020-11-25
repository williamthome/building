import { Inject, Injectable } from '@/shared/dependency-injection'
import { Middleware, MiddlewareResponse } from '../protocols'
import { forbidden, notFound, unauthorized } from '@/presentation/factories/http.factory'
import { HttpRequest } from '@/presentation/protocols'
import { HandleLogError } from '@/presentation/decorators'
import { GetCompanyByIdUseCase } from '@/domain/usecases'
import { AccessDeniedError, CanNotFindEntityError } from '@/presentation/errors'
import { okMiddleware } from '../helpers/middleware.helper'

@Injectable()
export class ActiveCompanyMiddleware implements Middleware {

  constructor (
    @Inject() private readonly getCompanyByIdUseCase: GetCompanyByIdUseCase
  ) { }

  @HandleLogError
  async handle<T> (httpRequest: HttpRequest<T>): MiddlewareResponse {
    const { loggedUserInfo } = httpRequest
    if (!loggedUserInfo || !loggedUserInfo.id || !loggedUserInfo.activeCompanyId)
      return unauthorized()

    const { id: userId, activeCompanyId } = loggedUserInfo

    const activeCompany = await this.getCompanyByIdUseCase.call(activeCompanyId)
    if (!activeCompany)
      return notFound(new CanNotFindEntityError('Company'))

    const member = activeCompany.members.find(companyMember => userId === companyMember.userId)
    if (!member)
      return forbidden(new AccessDeniedError())

    return okMiddleware(
      httpRequest,
      {
        loggedUserInfo: {
          companyRole: member?.companyRole,
          features: member?.features
        },
        activeCompanyInfo: {
          id: activeCompany?.id,
          members: activeCompany?.members
        }
      }
    )
  }
}