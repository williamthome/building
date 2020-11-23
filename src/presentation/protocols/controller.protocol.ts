import { HttpRequest, HttpResponse } from './http.protocol'

export type HandleResponse<T> = Promise<HttpResponse<T | null | Error>>

export interface Controller<TRequest, TResponse = TRequest> {
  handle: (request: HttpRequest<TRequest>) => HandleResponse<TResponse>
}