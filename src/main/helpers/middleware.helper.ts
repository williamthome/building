import { ok } from '@/presentation/factories/http.factory'
import { ActiveCompanyInfo, HttpRequest, HttpResponse, LoggedUserInfo } from '@/presentation/protocols'
import { MiddlewareContent } from '../protocols'

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