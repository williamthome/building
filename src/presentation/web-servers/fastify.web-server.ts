import { Injectable, Inject } from 'heinjector'
import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Route, WebServer, Controller, HttpHeaders, HttpParameters, HttpRequest } from '../protocols'

@Injectable({
  identifier: 'webServer'
})
export class Fastify implements WebServer {
  private _isListening = false

  private readonly fastifyInstance: FastifyInstance

  constructor (
    @Inject({ identifier: 'PORT' }) public readonly port: number,
    @Inject({ isArray: true }) public readonly routes: Route<unknown>[]
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
      preHandler: [
        // middlewares
      ]
    })
  }

  adaptHttpResponse = <T> (controller: Controller<T>) => {
    return async (req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> => {
      const httpRequest: HttpRequest<T> = {
        body: req.body as T,
        headers: this.adaptHttpHeaders(req),
        params: req.params as HttpParameters
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