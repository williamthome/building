import { FastifyRequest, FastifyReply } from 'fastify'
import { Controller, HttpParameters, HttpRequest } from '@/presentation/protocols'
import { HttpAdapter } from '../../protocols/http-adapter.protocol'

export class AdaptHttpToFastifyRoute<T> implements HttpAdapter<T> {
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