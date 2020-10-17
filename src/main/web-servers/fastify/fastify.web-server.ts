import fastify, { FastifyInstance } from 'fastify'
import { WebServer } from '@/main/protocols'
import { routes } from '@/main/routes/routes'
import { adaptRouteToFastify } from '@/main/adapters/web-servers/fastify.route-adapter'

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
      adaptRouteToFastify(route, this.fastifyInstance)
      console.log(`[${index+1}/${allRoutes.length}] Route '${route.path}' injected`)
    }))
  }

  get isListening(): boolean {
    return this._isListening
  }
}