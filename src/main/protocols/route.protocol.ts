import { Middleware } from './middleware.protocol'
import { Controller, HttpMethod } from '@/presentation/protocols'

export interface Route<TRequest, TResponse = TRequest> {
  method: HttpMethod
  path: string
  controller: Controller<TRequest, TResponse>
  middlewares: Middleware[]
}