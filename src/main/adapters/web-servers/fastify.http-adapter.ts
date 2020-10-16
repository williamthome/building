import { FastifyRequest, FastifyReply } from 'fastify'
import { Controller, HttpParameters, HttpRequest } from '@/presentation/protocols'

export const adaptHttpToFastify = <T>(controller: Controller<T>) => {
  return async (req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> => {
    const httpRequest: HttpRequest<T> = {
      body: req.body as T,
      headers: req.headers,
      params: req.params as HttpParameters
    }
    const httpResponse = await controller.handle(httpRequest)
    return httpResponse.body instanceof Error
      ? res.status(httpResponse.statusCode).send({ error: httpResponse.body.message })
      : res.status(httpResponse.statusCode).send(httpResponse.body)
  }
}