import fastify, { FastifyInstance, FastifyReply, FastifyRequest, HookHandlerDoneFunction, preHandlerHookHandler } from 'fastify'
import { Injectable, Inject } from '@/shared/dependency-injection'
import { HttpStatusCode } from '../constants'
import { Route, WebServer, Controller, HttpHeaders, HttpParameters, HttpRequest, Middleware, LoggedUserInfo } from '../protocols'

@Injectable('webServer')
export class Fastify implements WebServer {
  private _isListening = false

  private readonly fastifyInstance: FastifyInstance

  constructor (
    @Inject('PORT') public readonly port: number,
    @Inject() public readonly routes: Route<unknown>[]
  ) {
    this.fastifyInstance = fastify()
  }

  server = (): unknown => {
    return this.fastifyInstance.server
  }

  listen = async (): Promise<void> => {
    await this.injectRoutes()
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

  injectRoutes = async (): Promise<void> => {
    if (this.routes.length === 0) throw new Error('No routes')

    await Promise.all(this.routes.map((route, index) => {
      this.adaptRoute(route, this.fastifyInstance)
      console.log(`[${index+1}/${this.routes.length}] Route '${route.path}' injected`)
    }))
  }

  get isListening(): boolean {
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
    return async (req: FastifyRequest, res: FastifyReply, next: HookHandlerDoneFunction): Promise<void> => {
      const httpRequest: HttpRequest<T> = {
        body: req.body as T,
        headers: this.adaptHttpHeaders(req),
        params: req.params as HttpParameters,
        loggedUserInfo: req.loggedUserInfo
      }

      const httpResponse = await middleware.handle(httpRequest)

      switch (httpResponse.statusCode) {
        case HttpStatusCode.OK:
          req.loggedUserInfo = httpResponse.body as LoggedUserInfo
          next()
          break
        case HttpStatusCode.NO_CONTENT:
          next()
          break
        default:
          res.status(httpResponse.statusCode).send({
            error: (httpResponse.body as Error).message
          })
      }
    }
  }

  adaptHttpResponse = <T> (controller: Controller<T>) => {
    return async (req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> => {
      const httpRequest: HttpRequest<T> = {
        body: req.body as T,
        headers: this.adaptHttpHeaders(req),
        params: req.params as HttpParameters,
        loggedUserInfo: req.loggedUserInfo
      }
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