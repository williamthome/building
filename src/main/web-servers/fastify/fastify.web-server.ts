import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Route, WebServer } from '@/main/protocols'
import { routes } from '@/main/routes/routes'
import { Controller, HttpHeaders, HttpParameters, HttpRequest } from '@/presentation/protocols'

export class Fastify implements WebServer {
  private _isListening = false

  private readonly fastifyInstance: FastifyInstance

  constructor (public readonly port: number) {
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
    const allRoutes = routes()
    await Promise.all(allRoutes.map((route, index) => {
      this.adaptRoute(route, this.fastifyInstance)
      console.log(`[${index+1}/${allRoutes.length}] Route '${route.path}' injected`)
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