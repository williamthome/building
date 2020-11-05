import { Controller, HttpMethods } from '../protocols'

export interface Route<T> {
  method: HttpMethods
  path: string
  controller: Controller<T>
  requirement: 'admin' | 'auth' | 'master' | 'none'
  permissions?: number
}