import { FastifyInstance } from 'fastify'
import { Route } from '@/main/protocols'
import { adaptHttpToFastify } from './fastify.http-adapter'

export const adaptRouteToFastify = <T>(
  route: Route<T>,
  fastifyInstance: FastifyInstance
): FastifyInstance => {
  return fastifyInstance.route({
    method: route.method,
    url: route.path,
    handler: adaptHttpToFastify(route.controller),
    preHandler: [
      // middlewares
    ]
  })
}