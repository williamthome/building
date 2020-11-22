import { hasFeatures } from '@/shared/helpers/user-features.helper'
import { UserFeatures, UserRole } from '@/shared/constants'
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
    loggedUserInfo.role !== undefined &&
    loggedUserInfo.features !== undefined &&
    (
      loggedUserInfo.role === UserRole.owner ||
      hasFeatures(loggedUserInfo.features, requirements)
    )
}