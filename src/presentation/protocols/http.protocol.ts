import { HttpHeaderName, HttpStatusCode } from '../constants'
import { ActiveCompanyInfo } from './active-company-info.protocol'
import { LoggedUserInfo } from './logged-user-info.protocol'

// export type HttpHeaders = { [P in HttpHeaderName]?: string | undefined }
export type HttpHeaders = Partial<Record<HttpHeaderName | string, string>>

export type HttpParameters = Record<string, string>

export type HttpQuery = Record<string, string>

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface HttpRequest<T = undefined> {
  body?: T
  headers?: HttpHeaders
  params?: HttpParameters
  query?: HttpQuery
  loggedUserInfo?: LoggedUserInfo
  activeCompanyInfo?: ActiveCompanyInfo
}

export interface HttpResponse<T = null> {
  statusCode: HttpStatusCode
  body: T
}