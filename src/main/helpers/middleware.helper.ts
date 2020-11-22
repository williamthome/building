import { hasFeatures } from '@/shared/helpers/user-features.helper'
import { UserFeatures, CompanyRole } from '@/shared/constants'
import { MiddlewareContent } from '../protocols'
import { ok } from '@/presentation/factories/http.factory'
import { ActiveCompanyInfo, HttpRequest, HttpResponse, LoggedUserInfo } from '@/presentation/protocols'

const merge = <T> (original?: Partial<T>, toMerge?: Partial<T>): Partial<T> => ({
  ...original,
  ...toMerge
})

const mergeLoggedUserInfo = (
  loggedUserInfo?: Partial<LoggedUserInfo>,
  toMerge?: Partial<LoggedUserInfo>
): Partial<LoggedUserInfo> => merge(loggedUserInfo, toMerge)

const mergeActiveCompanyInfo = (
  activeCompanyInfo?: Partial<ActiveCompanyInfo>,
  toMerge?: Partial<ActiveCompanyInfo>
): Partial<ActiveCompanyInfo> => merge(activeCompanyInfo, toMerge)

export const okMiddleware = (
  httpRequest: HttpRequest,
  loggedUserInfoToMerge?: Partial<LoggedUserInfo>,
  activeCompanyInfoToMerge?: Partial<ActiveCompanyInfo>
): HttpResponse<MiddlewareContent> => {
  return ok<MiddlewareContent>({
    loggedUserInfo: mergeLoggedUserInfo(loggedUserInfoToMerge, httpRequest.loggedUserInfo),
    activeCompanyInfo: mergeActiveCompanyInfo(activeCompanyInfoToMerge, httpRequest.activeCompanyInfo)
  })
}

export const hasRequirements = <T> (httpRequest: HttpRequest<T>, requirements: UserFeatures): boolean => {
  const { loggedUserInfo } = httpRequest

  return loggedUserInfo !== undefined &&
    loggedUserInfo.companyRole !== undefined &&
    loggedUserInfo.features !== undefined &&
    (
      loggedUserInfo.companyRole === CompanyRole.owner ||
      hasFeatures(loggedUserInfo.features, requirements)
    )
}

export const hasPermission = <T> (httpRequest: HttpRequest<T>, companyRole: CompanyRole | CompanyRole[]): boolean => {
  const roles = Array.isArray(companyRole) ? companyRole : [companyRole]

  const { loggedUserInfo } = httpRequest

  return loggedUserInfo !== undefined &&
    loggedUserInfo.companyRole !== undefined &&
    roles.includes(loggedUserInfo.companyRole)
}