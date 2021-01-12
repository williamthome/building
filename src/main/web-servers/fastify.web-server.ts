import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  preHandlerHookHandler,
  RawServerBase
} from 'fastify'
import cors from 'fastify-cors'
import multer from 'fastify-multer'
import { File as MulterFile } from 'fastify-multer/lib/interfaces'
import { Injectable, Inject } from '@/shared/dependency-injection'
import { AdaptMiddlewareHttpRequest, Middleware, Route, WebServer } from '../protocols'
import { Controller, HttpHeaders, HttpParameters, RequestFile } from '@/presentation/protocols'
import { isRequestFile } from '@/presentation/helpers/file.helper'

@Injectable('webServer')
export class Fastify
  implements
    WebServer<
      FastifyRequest,
      FastifyReply,
      preHandlerHookHandler,
      FastifyInstance,
      RawServerBase,
      MulterFile
    > {
  private _isListening = false

  private readonly fastifyInstance: FastifyInstance

  constructor(
    @Inject('PORT')
    public readonly port: number,

    @Inject()
    public readonly routes: Route<unknown, unknown>[]
  ) {
    this.fastifyInstance = fastify()
    this.fastifyInstance.register(cors, {
      origin: '*'
    })
    this.fastifyInstance.register(multer.contentParser)
    this.injectRoutes()
  }

  server = (): RawServerBase => {
    return this.fastifyInstance.server
  }

  listen = async (): Promise<void> => {
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

  injectRoutes = (): void => {
    if (this.routes.length === 0) throw new Error('No routes')

    for (const [index, route] of this.routes.entries()) {
      this.adaptRoute(route, this.fastifyInstance)
      console.log(`Route ${index + 1}/${this.routes.length} injected - ${route.path?.describe}`)
    }
  }

  get isListening(): boolean {
    return this._isListening
  }

  adaptRoute = <TReq, TRes>(
    route: Route<TReq, TRes>,
    fastifyInstance: FastifyInstance
  ): FastifyInstance => {
    if (!route.path) throw new Error('No route path')

    return fastifyInstance.route({
      method: route.path.method,
      url: route.path.urn,
      handler: this.adaptHttpResponse(route.controller),
      preHandler: [multer().any(), ...this.adaptMiddlewares<TReq>(route.middlewares)]
    })
  }

  private adaptMiddlewares = <TReq>(middlewares: Middleware[]): preHandlerHookHandler[] => {
    const adapted: preHandlerHookHandler[] = []
    for (const middleware of middlewares) adapted.push(this.adaptMiddleware<TReq>(middleware))
    return adapted
  }

  adaptMiddleware = <TReq>(middleware: Middleware): preHandlerHookHandler => {
    return async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
      const httpRequest = this.adaptHttpRequest<TReq>(req)

      const { statusCode, body: middlewareContent } = await middleware.handle<TReq>(httpRequest)

      if (middlewareContent instanceof Error) {
        res.status(statusCode).send({
          error: middlewareContent.message
        })
      } else {
        if (middlewareContent) {
          const { loggedUserInfo, activeCompanyInfo } = middlewareContent
          req.loggedUserInfo = loggedUserInfo
          req.activeCompanyInfo = activeCompanyInfo
        }
      }
    }
  }

  adaptHttpRequest = <TReq>(req: FastifyRequest): AdaptMiddlewareHttpRequest<TReq> => ({
    body: req.body as TReq,
    headers: this.adaptHttpHeaders(req),
    params: req.params as HttpParameters,
    query: req.query,
    loggedUserInfo: req.loggedUserInfo,
    activeCompanyInfo: req.activeCompanyInfo,
    files: this.adaptRequestFiles(req.files || [])
  })

  adaptHttpResponse = <TReq, TRes>(controller: Controller<TReq, TRes>) => {
    return async (req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> => {
      const httpRequest = this.adaptHttpRequest<TReq>(req)
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

  private adaptFile = (file: MulterFile): RequestFile => {
    if (!file.buffer) throw new Error('Buffer of file is undefined')

    if (!file.size) throw new Error('Size of file is undefined')

    return {
      name: file.originalname,
      buffer: file.buffer,
      mimeType: file.mimetype
    }
  }

  adaptRequestFiles = (files: MulterFile[] | RequestFile[]): RequestFile[] => {
    const adapted: RequestFile[] = []
    for (const file of files) {
      adapted.push(isRequestFile(file) ? file : this.adaptFile(file))
    }
    return adapted
  }
}
