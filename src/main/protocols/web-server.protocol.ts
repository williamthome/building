/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpRequest } from '@/presentation/protocols'
import {
  RouteAdapter,
  HttpResponseAdapter,
  HttpHeadersAdapter,
  MiddlewareAdapter,
  MiddlewaresAdapter,
  HttpRequestAdapter
} from '../adapters'
import { Route } from './route.protocol'

export interface WebServer
extends
  MiddlewareAdapter<any>,
  MiddlewaresAdapter<any>,
  RouteAdapter<any>,
  HttpRequestAdapter<any>,
  HttpResponseAdapter<any, any>,
  HttpHeadersAdapter<any>
{
  port: number
  routes: Route<unknown>[]
  server: () => any
  listen: () => Promise<void>
  ready: () => Promise<void>
  close: () => Promise<void>
  injectRoutes: () => void
  isListening: boolean
}

export type AdaptMiddlewareHttpRequest<T> = { [K in keyof Required<HttpRequest<T>>]: any }