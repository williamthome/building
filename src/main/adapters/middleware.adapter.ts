import { Middleware } from '../protocols'

export interface MiddlewareAdapter<Mid> {
  adaptMiddleware: (middleware: Middleware) => Mid
}