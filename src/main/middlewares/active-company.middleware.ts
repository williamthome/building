import { Inject, Injectable } from '@/shared/dependency-injection'
import { Middleware, MiddlewareResponse } from '../protocols'
import { okMiddleware } from '../helpers/middleware.helper'
import { badRequest, forbidden, notFound } from '@/presentation/factories/http.factory'
import { HttpRequest } from '@/presentation/protocols'
import { HandleError } from '@/presentation/decorators'
import {
  AccessDeniedError,
  ActiveCompanyIsFalsyError,
  EntityNotFoundError
} from '@/presentation/errors'
import { GetCompanyByIdUseCase, GetPlanByIdUseCase } from '@/domain/usecases'

@Injectable()
export class ActiveCompanyMiddleware implements Middleware {
  constructor(
    @Inject()
    private readonly getCompanyByIdUseCase: GetCompanyByIdUseCase,

    @Inject()
    private readonly getPlanByIdUseCase: GetPlanByIdUseCase
  ) {}

  @HandleError
  async handle<T>(httpRequest: HttpRequest<T>): MiddlewareResponse {
    const { loggedUserInfo } = httpRequest
    if (!loggedUserInfo?.activeCompanyId) return badRequest(new ActiveCompanyIsFalsyError())

    const { id: userId, activeCompanyId } = loggedUserInfo

    const activeCompany = await this.getCompanyByIdUseCase.call(activeCompanyId)
    if (!activeCompany) return notFound(new EntityNotFoundError('Company'))

    const member = activeCompany.members.find((companyMember) => userId === companyMember.userId)
    if (!member) return forbidden(new AccessDeniedError())

    const plan = await this.getPlanByIdUseCase.call(activeCompany.planId)
    if (!plan) return notFound(new EntityNotFoundError('Plan'))

    return okMiddleware(httpRequest, {
      loggedUserInfo: {
        companyRole: member?.companyRole,
        features: member?.features
      },
      activeCompanyInfo: {
        id: activeCompany?.id,
        members: activeCompany?.members,
        limit: plan.limit
      }
    })
  }
}
