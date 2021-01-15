import { HttpHeaderName, HttpStatusCode } from '../constants'
import { LoggedUserInfo, ActiveCompanyInfo, RequestFile } from '.'

// export type HttpHeaders = { [P in HttpHeaderName]?: string | undefined }
export type HttpHeaders = Partial<Record<HttpHeaderName | string, string>>

export type HttpParameters = Record<string, string>

export type HttpQuery = Record<string, string>

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface Cookie {
  name: string
  value?: string
  expires?: number | 'now'
  serverSideOnly?: boolean
  path?: string
  sameSite?: 'none' | 'strict' | 'lax'
}

export interface HttpOptions {
  cookies?: Cookie[]
}

export interface HttpRequest<T = undefined> {
  body?: T
  headers?: HttpHeaders
  params?: HttpParameters
  query?: HttpQuery
  loggedUserInfo?: LoggedUserInfo
  activeCompanyInfo?: ActiveCompanyInfo
  files?: RequestFile[]
  cookies?: Cookie[]
}

export interface HttpResponse<T = null> {
  statusCode: HttpStatusCode
  body: T
  options?: HttpOptions
}
