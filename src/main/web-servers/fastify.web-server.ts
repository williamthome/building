import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
  preHandlerHookHandler,
  RawServerBase
} from 'fastify'
import multer from 'fastify-multer'
import cookie from 'fastify-cookie'
import { File as MulterFile } from 'fastify-multer/lib/interfaces'
import { Injectable, Inject } from '@/shared/dependency-injection'
import { AdaptMiddlewareHttpRequest, Middleware, Route, WebServer } from '../protocols'
import {
  Controller,
  Cookie,
  HttpResponse,
  HttpHeaders,
  HttpParameters,
  HttpQuery,
  RequestFile
} from '@/presentation/protocols'
import { isRequestFile } from '@/presentation/helpers/file.helper'

@Injectable('webServer')
export class Fastify
  implements
    WebServer<FastifyRequest, FastifyReply, preHandlerHookHandler, FastifyInstance, RawServerBase> {
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
    this.fastifyInstance.register(cookie)
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
    res.raw.setHeader(
      'Access-Control-Allow-Origin',
      process.env.NODE_ENV === 'production'
        ? 'https://api-building.web.app' // ? 'https://api-building.firebaseapp.com'
        : req.headers.origin || '*'
    )
    res.raw.setHeader('Vary', 'Origin')
    res.raw.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS,HEAD')
    res.raw.setHeader('Access-Control-Allow-Credentials', 'true')
    res.raw.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, User-Agent'
    )
  }

  adaptHttpRequest = <TReq>(req: FastifyRequest): AdaptMiddlewareHttpRequest<TReq> => {
    const { body, params, query, loggedUserInfo, activeCompanyInfo } = req
    return {
      body: body as TReq,
      headers: this.adaptHttpHeaders(req),
      params: params as HttpParameters,
      query: query as HttpQuery,
      loggedUserInfo: loggedUserInfo,
      activeCompanyInfo: activeCompanyInfo,
      files: this.adaptRequestFiles(req),
      cookies: this.adaptRequestCookies(req)
    }
  }

  adaptCookie = (cookie: [string, string]): Cookie => ({
    name: cookie[0],
    value: cookie[1]
  })

  adaptRequestCookies = (req: FastifyRequest): Cookie[] => {
    const cookies: Cookie[] = []
    for (const cookie of Object.entries(req.cookies)) cookies.push(this.adaptCookie(cookie))
    return cookies
  }

  setResponseCookies = <TRes>(
    apiResponse: HttpResponse<TRes>,
    webServerResponse: FastifyReply
  ): void => {
    apiResponse.options?.cookies?.forEach((cookie) => {
      const { name, value, expires, serverSideOnly, path } = cookie

      webServerResponse.setCookie(name, value ?? '', {
        expires:
          typeof expires === 'number'
            ? new Date(Date.now() + expires)
            : expires === 'now'
            ? new Date(0)
            : undefined,
        httpOnly: serverSideOnly ?? false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        path: path || '/'
      })
    })
  }

  adaptHttpResponse = <TReq, TRes>(controller: Controller<TReq, TRes>) => {
    return async (req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> => {
      const httpRequest = this.adaptHttpRequest<TReq>(req)
      const httpResponse = await controller.handle(httpRequest)

      this.setResponseCookies(httpResponse, res)

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

  adaptRequestFiles = (req: FastifyRequest): RequestFile[] => {
    const adapted: RequestFile[] = []
    if (req.files) {
      for (const file of req.files) {
        adapted.push(isRequestFile(file) ? file : this.adaptFile(file))
      }
    }
    return adapted
  }
}
