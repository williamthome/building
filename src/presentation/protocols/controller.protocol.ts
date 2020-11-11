import { HttpRequest, HttpResponse } from './http.protocol'

export type HandleResponse<T> = Promise<HttpResponse<T | null | Error>>

export interface Controller<T> {
  handle: (request: HttpRequest<T>) => HandleResponse<T>
}