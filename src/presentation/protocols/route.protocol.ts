import { Controller, HttpMethods } from '../protocols'

export type RouteRequirement = 'admin' | 'auth' | 'master' | 'none'

export interface Route<T> {
  method: HttpMethods
  path: string
  controller: Controller<T>
  requirement: RouteRequirement
  permissions?: number
}