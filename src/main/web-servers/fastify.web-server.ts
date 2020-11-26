import fastify, { FastifyInstance, FastifyReply, FastifyRequest, preHandlerHookHandler } from 'fastify'
import { Injectable, Inject } from '@/shared/dependency-injection'
import { AdaptMiddlewareHttpRequest, Middleware, Route, WebServer } from '../protocols'
import { Controller, HttpHeaders, HttpParameters } from '@/presentation/protocols'

@Injectable('webServer')
export class Fastify implements WebServer {
  private _isListening = false

  private readonly fastifyInstance: FastifyInstance

  constructor (
    @Inject('PORT') public readonly port: number,
    @Inject() public readonly routes: Route<unknown>[]
  ) {
    this.fastifyInstance = fastify()
    this.injectRoutes()
  }

  server = (): unknown => {
    return this.fastifyInstance.server
  }

  listen = async (): Promise<void> => {
    await this.fastifyInstance.listen(this.port)
    await this.ready()
    this._isListening = true
    console.log('Server listening on port ' + this.port)
  }

  ready = async (): Promise<void> => {
    await this.fastifyInstance.ready()
  }

  close = async (): Promise<void> => {
    await this.fastifyInstance.close()
    this._isListening = false
  }

  injectRoutes = (): void => {
    if (this.routes.length === 0) throw new Error('No routes')

    this.routes.map((route, index) => {
      this.adaptRoute(route, this.fastifyInstance)
      console.log(`Route ${index + 1}/${this.routes.length} injected - ${route.path} ${route.method}`)
    })
  }

  get isListening (): boolean {
    return this._isListening
  }

  adaptRoute = <T> (
    route: Route<T>,
    fastifyInstance: FastifyInstance
  ): FastifyInstance => {
    return fastifyInstance.route({
      method: route.method,
      url: route.path,
      handler: this.adaptHttpResponse(route.controller),
      preHandler: this.adaptMiddlewares<T>(route.middlewares)
    })
  }

  adaptMiddlewares = <T> (middlewares: Middleware[]): preHandlerHookHandler[] => {
    const adapted: preHandlerHookHandler[] = []
    for (const middleware of middlewares)
      adapted.push(this.adaptMiddleware<T>(middleware))
    return adapted
  }

  adaptMiddleware = <T> (middleware: Middleware): preHandlerHookHandler => {
    return async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
      const httpRequest = this.adaptHttpRequest(req)

      const { statusCode, body: middlewareContent } = await middleware.handle<T>(httpRequest)

      if (middlewareContent instanceof Error) {
        res.status(statusCode).send({
          error: middlewareContent.message
        })
      } else {
        if (middlewareContent) {
          const { loggedUserInfo, activeCompanyInfo } = middlewareContent
          req.loggedUserInfo = loggedUserInfo
          req.activeCompanyInfo = activeCompanyInfo
        }
      }
    }
  }

  adaptHttpRequest = <T> (req: FastifyRequest): AdaptMiddlewareHttpRequest<T> => ({
    body: req.body as T,
    headers: this.adaptHttpHeaders(req),
    params: req.params as HttpParameters,
    query: req.query,
    loggedUserInfo: req.loggedUserInfo,
    activeCompanyInfo: req.activeCompanyInfo
  })

  adaptHttpResponse = <T> (controller: Controller<T>) => {
    return async (req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> => {
      const httpRequest = this.adaptHttpRequest(req)
      const httpResponse = await controller.handle(httpRequest)
      return httpResponse.body instanceof Error
        ? res.status(httpResponse.statusCode).send({ error: httpResponse.body.message })
        : res.status(httpResponse.statusCode).send(httpResponse.body)
    }
  }

  adaptHttpHeaders = (req: FastifyRequest): HttpHeaders => {
    const headers: HttpHeaders = {}
    for (const [key, value] of Object.entries(req.headers)) {
      if (key && value) {
        if (typeof value === 'string') {
          headers[key] = value
        } else {
          for (const v of value) {
            headers[key] = v
          }
        }
      }
    }
    return headers
  }
}