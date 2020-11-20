import { Middleware } from '../protocols'

export interface MiddlewaresAdapter<Mid> {
  adaptMiddlewares: (middlewares: Middleware[]) => Mid[]
}