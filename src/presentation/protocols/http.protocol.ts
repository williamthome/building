import { HttpHeaderName } from '../contants/http-header-name'
import { HttpStatusCode } from '../contants/http-status-code'

export type HttpHeaders = Partial<Record<HttpHeaderName, string>>

export type HttpParameters = Record<string, string>

export interface HttpRequest<T = unknown> {
  body?: T
  headers?: HttpHeaders
  params?: HttpParameters
}

export interface HttpResponse<T = unknown> {
  statusCode: HttpStatusCode
  body: T
}