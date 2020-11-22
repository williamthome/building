/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpRequest } from '@/presentation/protocols'
import {
  RouteAdapter,
  HttpResponseAdapter,
  HttpHeadersAdapter,
  MiddlewareAdapter,
  MiddlewaresAdapter
} from '../adapters'
import { Route } from './route.protocol'

export interface WebServer
extends
  MiddlewareAdapter<any>,
  MiddlewaresAdapter<any>,
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

export type AdaptMiddlewareHttpRequest = { [T in keyof Required<HttpRequest<T>>]: any }