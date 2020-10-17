import { Route } from '@/main/protocols'
import { Controller, HttpHeaders, HttpParameters, HttpRequest } from '@/presentation/protocols'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { HttpHeadersAdapter } from '../http-headers.adapter'
import { HttpResponseAdapter } from '../http-response.adapter'
import { RouteAdapter } from '../route.adapter'
import { adaptHttpHeadersToFastify } from './fastify.headers-adapter'

export class FastifyAdapter
implements
  RouteAdapter<FastifyInstance>,
  HttpResponseAdapter<FastifyRequest, FastifyReply>,
  HttpHeadersAdapter<FastifyRequest> {

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
        headers: adaptHttpHeadersToFastify(req),
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