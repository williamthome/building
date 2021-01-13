import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
  preHandlerHookHandler,
  RawServerBase
} from 'fastify'
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
    @Inject('HOST')
    public readonly host: string,

    @Inject('PORT')
    public readonly port: string,

    @Inject()
    public readonly routes: Route<unknown, unknown>[]
  ) {
    this.fastifyInstance = fastify()
    this.fastifyInstance.options('*', (req, res) => {
      this.enableCors(req, res)
      res.send()
    })
    this.fastifyInstance.register(multer.contentParser)
    this.injectRoutes()
  }

  server = (): RawServerBase => {
    return this.fastifyInstance.server
  }

  listen = async (): Promise<void> => {
    await this.fastifyInstance.listen(this.port, this.host)
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
      preHandler: [
        this.corsMiddleware(),
        multer().any(),
        ...this.adaptMiddlewares<TReq>(route.middlewares)
      ]
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

  corsMiddleware = (): preHandlerHookHandler => {
    return (req: FastifyRequest, res: FastifyReply, done: HookHandlerDoneFunction): void => {
      this.enableCors(req, res)
      done()
    }
  }

  enableCors = (req: FastifyRequest, res: FastifyReply): void => {
    res.raw.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*')
    res.raw.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS,HEAD')
    res.raw.setHeader('Access-Control-Allow-Credentials', 'true')
    res.raw.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, User-Agent'
    )
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
