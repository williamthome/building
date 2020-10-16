import fastify, { FastifyInstance } from 'fastify'
import { WebServer } from '../protocols/web-server.protocol'

export class Fastify implements WebServer {
  private readonly fastifyInstance: FastifyInstance

  constructor (public readonly port: number) {
    this.fastifyInstance = fastify()
  }

  listen = async (): Promise<void> => {
    await this.fastifyInstance.listen(this.port)
    console.log('Server listening on port ' + this.port)
  }
}