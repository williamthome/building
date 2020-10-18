/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  RouteAdapter,
  HttpResponseAdapter,
  HttpHeadersAdapter
} from '../adapters'

export interface WebServer
extends
  RouteAdapter<any>,
  HttpResponseAdapter<any, any>,
  HttpHeadersAdapter<any>
{
  port: number
  server: () => any
  listen: () => Promise<void>
  ready: () => Promise<void>
  close: () => Promise<void>
  injectRoutes: () => Promise<void>
  isListening: boolean
}