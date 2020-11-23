import { Inject, Injectable } from '@/shared/dependency-injection'
import { Middleware, MiddlewareResponse } from '../protocols'
import { AccessDeniedError, CanNotFindEntityError } from '@/presentation/errors'
import { forbidden, notFound, unauthorized } from '@/presentation/factories/http.factory'
import { HttpRequest } from '@/presentation/protocols'
import { HandleLogError } from '@/presentation/decorators'
import { GetCompanyByIdUseCase, GetUserByAccessTokenUseCase } from '@/domain/usecases'
import { authorizationToken, okMiddleware } from '../helpers/middleware.helper'
import { CompanyEntity } from '@/domain/entities'
import { Member } from '@/domain/entities/nested'

@Injectable()
export class AuthMiddleware implements Middleware {

  constructor (
    @Inject() private readonly getUserByAccessTokenUseCase: GetUserByAccessTokenUseCase,
    @Inject() private readonly getCompanyByIdUseCase: GetCompanyByIdUseCase
  ) { }

  @HandleLogError
  async handle<T> (httpRequest: HttpRequest<T>): MiddlewareResponse {
    const accessToken = authorizationToken(httpRequest)
    if (!accessToken)
      return unauthorized()

    const user = await this.getUserByAccessTokenUseCase.call(accessToken)
    if (!user)
      return notFound(new CanNotFindEntityError('User'))

    let activeCompany: CompanyEntity | null = null
    let member: Member | undefined = undefined

    if (user.activeCompanyId) {
      activeCompany = await this.getCompanyByIdUseCase.call(user.activeCompanyId)
      if (!activeCompany)
        return notFound(new CanNotFindEntityError('Company'))

      member = activeCompany.members.find(companyMember => user.id === companyMember.userId)
      if (!member)
        return forbidden(new AccessDeniedError())
    }

    return okMiddleware(
      httpRequest,
      {
        loggedUserInfo: {
          id: user.id,
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