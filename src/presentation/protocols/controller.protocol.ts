import { HttpRequest, HttpResponse } from './http.protocol'

export interface Controller<T> {
  handle: (request: HttpRequest<Partial<T>>) => Promise<HttpResponse<T | Error>>
}

export interface LogControllerDecorator<T> extends Controller<T> {
  controller: Controller<T>
}