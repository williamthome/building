import { Middleware } from './middleware.protocol'
import { Controller, HttpMethods } from '@/presentation/protocols'

export interface Route<TRequest, TResponse = TRequest> {
  method: HttpMethods
  path: string
  controller: Controller<TRequest, TResponse>
  middlewares: Middleware[]
}