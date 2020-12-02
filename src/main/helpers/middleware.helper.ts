import { UserFeatures, CompanyRole } from '@/shared/constants'
import { MiddlewareContent } from '../protocols'
import { ok } from '@/presentation/factories/http.factory'
import { ActiveCompanyInfo, HttpRequest, HttpResponse, LoggedUserInfo } from '@/presentation/protocols'
import { HttpHeaderName } from '@/presentation/constants'

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

export const okMiddleware = <T> (
  httpRequest: HttpRequest<T>,
  toMerge?: {
    loggedUserInfo?: Partial<LoggedUserInfo>,
    activeCompanyInfo?: Partial<ActiveCompanyInfo>
  }
): HttpResponse<MiddlewareContent> => {
  return ok<MiddlewareContent>({
    loggedUserInfo: mergeLoggedUserInfo(httpRequest.loggedUserInfo, toMerge?.loggedUserInfo),
    activeCompanyInfo: mergeActiveCompanyInfo(httpRequest.activeCompanyInfo, toMerge?.activeCompanyInfo)
  })
}

export const authorizationToken = <T> (httpRequest: HttpRequest<T>): string | undefined => {
  const authorization: string | undefined = httpRequest.headers
    ? httpRequest.headers[HttpHeaderName.AUTHORIZATION] !== undefined
      ? httpRequest.headers[HttpHeaderName.AUTHORIZATION]
      : httpRequest.headers[HttpHeaderName.AUTHORIZATION.toLowerCase()] !== undefined
        ? httpRequest.headers[HttpHeaderName.AUTHORIZATION.toLowerCase()]
        : undefined
    : undefined

  return authorization && authorization.startsWith('Bearer ')
    ? authorization.substring(7)
    : undefined
}

export const hasFeatures = (
  have: UserFeatures | number,
  needed: UserFeatures | number
): boolean => {
  return (have & needed) === needed
}

export const hasRequirements = <T> (httpRequest: HttpRequest<T>, requirements: UserFeatures): boolean => {
  const { loggedUserInfo } = httpRequest

  return loggedUserInfo !== undefined &&
    loggedUserInfo.companyRole !== undefined &&
    loggedUserInfo.features !== undefined &&
    (
      loggedUserInfo.companyRole === CompanyRole.owner ||
      loggedUserInfo.companyRole === CompanyRole.master ||
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