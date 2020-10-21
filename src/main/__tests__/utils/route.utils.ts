import { Route } from '@/main/protocols'

export const makeRouteDescribe = (
  route: Route<unknown>
): string => `${route.method} ${route.path}`