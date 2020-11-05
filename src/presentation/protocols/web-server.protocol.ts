/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  RouteAdapter,
  HttpResponseAdapter,
  HttpHeadersAdapter
} from '../adapters'
import { Route } from './route.protocol'

export interface WebServer
extends
  RouteAdapter<any>,
  HttpResponseAdapter<any, any>,
  HttpHeadersAdapter<any>
{
  port: number
  routes: Route<unknown>[]
  server: () => any
  listen: () => Promise<void>
  ready: () => Promise<void>
  close: () => Promise<void>
  injectRoutes: () => Promise<void>
  isListening: boolean
}