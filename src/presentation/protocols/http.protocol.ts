import { HttpHeaderName, HttpStatusCode } from '../constants'
import { LoggedUserInfo } from './logged-user-info.protocol'

// export type HttpHeaders = { [P in HttpHeaderName]?: string | undefined }
export type HttpHeaders = Partial<Record<HttpHeaderName | string, string>>

export type HttpParameters = Record<string, string>

export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface HttpRequest<T = unknown> {
  body?: T
  headers?: HttpHeaders
  params?: HttpParameters
  loggedUserInfo: LoggedUserInfo
}

export interface HttpResponse<T = unknown> {
  statusCode: HttpStatusCode
  body: T
}