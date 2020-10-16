import { Route } from '@/presentation/protocols'

export const makeRoutes = (...routes: Array<Route<unknown>>): Array<Route<unknown>> => {
  return routes
}