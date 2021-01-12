import { HttpRequest, HttpResponse } from './http.protocol'

export type HandleResponse<T = null> = Promise<HttpResponse<T | null | Error>>

export interface Controller<TRequest, TResponse = TRequest> {
  usesTransaction?: boolean
  handle: (request: HttpRequest<TRequest>) => HandleResponse<TResponse>
}
