import { Route } from '../protocols/route.protocol'
import { makeRoutes } from '../factories/route.factory'
import { userRoutes } from './user.routes'

export const routes = async (): Promise<Array<Route<unknown>>> => {
  const user = await userRoutes()
  return makeRoutes(
    ...user
  )
}