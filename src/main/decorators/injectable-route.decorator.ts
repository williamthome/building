import container from '@/shared/dependency-injection'
import { RouteOptions, Route, RoutePath } from '../protocols'

export const InjectableRoute = <TRequest = any, TResponse = any> (
  payload: RoutePath | RouteOptions
) => <T extends new (...args: any[]) => Route<TRequest, TResponse>> (route: T): T => {
  container.define('routes').asNewableArray(route)

  const pathKey: keyof Route<TRequest, TResponse> = 'path'

  Object.defineProperty((route as any).prototype, pathKey, {
    get: () => {
      return payload instanceof RoutePath ? payload : new RoutePath(payload.method, payload.urn)
    },
    set: () => new Error(`Property ${pathKey} in route is readonly`)
  })

  return route
}