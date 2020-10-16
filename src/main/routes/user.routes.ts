import { Route } from '@/presentation/protocols'
import { makeAddUserController } from '../factories/controllers/user'
import { makeRoutes } from '../factories/route.factory'

export const userRoutes = (): Array<Route<unknown>> => makeRoutes({
  method: 'POST',
  path: '/user',
  controller: makeAddUserController(),
  requirement: 'none'
})