import { HttpRequest, HttpResponse } from './http.protocol'

export interface Controller<T> {
  handle: (request: HttpRequest<T>) => Promise<HttpResponse<T | null | Error>>
}

export interface LogControllerDecorator<T> extends Controller<T> {
  controller: Controller<T>
}