import { Route } from '../protocols'
import { makeAddUserController } from '../factories/controllers/user'
import { makeRoutes } from '../factories/route.factory'
import { UserEntity } from '@/domain/entities'

export const addUserRoute: Route<UserEntity> = {
  method: 'POST',
  path: '/user',
  controller: makeAddUserController(),
  requirement: 'none'
}

export const userRoutes = (): Array<Route<unknown>> => makeRoutes(
  addUserRoute
)