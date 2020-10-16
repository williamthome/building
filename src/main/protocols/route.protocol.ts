import { Controller } from '@/presentation/protocols'

export interface Route<T> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  path: string
  controller: Controller<T>
  requirement: 'admin' | 'auth' | 'master' | 'none'
  permissions?: number
}