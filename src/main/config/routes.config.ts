import { Route } from '../protocols/route.protocol'
import { makeRoutes } from '../factories/route.factory'
import { userRoutes } from '../routes/user.routes'

export const setupRoutes = (): Array<Route<unknown>> => {
  return makeRoutes(
    ...userRoutes()
  )
}