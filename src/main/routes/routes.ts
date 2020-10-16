import { Route } from '../protocols/route.protocol'
import { makeRoutes } from '../factories/route.factory'
import { userRoutes } from './user.routes'

export const routes = (): Array<Route<unknown>> => makeRoutes(
  ...userRoutes()
)