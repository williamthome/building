import { Controller, HttpMethods } from '../../presentation/protocols'
import { Middleware } from './middleware.protocol'

export type RouteRequirement = 'admin' | 'auth' | 'master' | 'none'

export interface Route<TRequest, TResponse = TRequest> {
  method: HttpMethods
  path: string
  controller: Controller<TRequest, TResponse>
  requirement: RouteRequirement
  permissions?: number
  middlewares: Middleware[]
}