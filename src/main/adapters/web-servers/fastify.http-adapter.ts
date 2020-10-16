import { FastifyRequest, FastifyReply } from 'fastify'
import { HttpAdapter } from '@/main/protocols'
import { Controller, HttpParameters, HttpRequest } from '@/presentation/protocols'

export class AdaptHttpToFastify<T> implements HttpAdapter<T> {
  adapt = async (controller: Controller<T>): Promise<void> => {
    async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
      const httpRequest: HttpRequest<T> = {
        body: req.body as T,
        headers: req.headers,
        params: req.params as HttpParameters
      }
      const httpResponse = await controller.handle(httpRequest)
      httpResponse.body instanceof Error
        ? res.status(httpResponse.statusCode).send({ error: httpResponse.body.message })
        : res.status(httpResponse.statusCode).send(httpResponse.body)
    }
  }
}