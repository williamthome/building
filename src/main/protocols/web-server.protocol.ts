import { Controller, HttpHeaders, HttpRequest, RequestFile } from '@/presentation/protocols'
import { Middleware } from './middleware.protocol'
import { Route } from './route.protocol'

export interface WebServer<
  TRequest = unknown,
  TResponse = unknown,
  TMiddleware = unknown,
  TInstance = unknown,
  TServer = unknown,
  TFile = unknown
> {
  port: number
  routes: Route<unknown, unknown>[]
  isListening: boolean
  server: () => TServer
  listen: () => Promise<void>
  ready: () => Promise<void>
  close: () => Promise<void>
  injectRoutes: () => void
  adaptHttpHeaders: (req: TRequest) => HttpHeaders
  adaptMiddleware: (middleware: Middleware) => TMiddleware
  adaptRoute: <TReq, TRes>(route: Route<TReq, TRes>, webServer: TInstance) => TInstance
  adaptHttpRequest: <TReq>(req: TRequest) => AdaptMiddlewareHttpRequest<TReq>
  adaptHttpResponse: <TReq, TRes>(
    controller: Controller<TReq, TRes>
  ) => (req: TRequest, res: TResponse) => void
  adaptRequestFiles: (files: TFile[]) => RequestFile[]
}

export type AdaptMiddlewareHttpRequest<TRequest> = {
  [K in keyof Required<HttpRequest<TRequest>>]: any
}
