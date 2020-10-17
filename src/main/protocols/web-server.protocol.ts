import {
  RouteAdapter,
  HttpResponseAdapter,
  HttpHeadersAdapter
} from '../adapters'

export interface WebServer<U, Req, Res>
extends
  RouteAdapter<U>,
  HttpResponseAdapter<Req, Res>,
  HttpHeadersAdapter<Req>
{
  port: number
  server: () => unknown
  listen: () => Promise<void>
  ready: () => Promise<void>
  close: () => Promise<void>
  injectRoutes: () => Promise<void>
  isListening: boolean
}