import { Route } from '../protocols'
// import { makeAddUserController } from '../factories/controllers/user'
import { makeRoutes } from '../factories/route.factory'
import { UserEntity } from '@/domain/entities'
import dinjector from '@/shared/libs/dinjector'
import { AddUserController } from '@/presentation/controllers/user/add-user.controller'

export const addUserRoute = async (): Promise<Route<UserEntity>> => {
  return {
    method: 'POST',
    path: '/user',
    controller: await dinjector.resolve(AddUserController),// makeAddUserController(),
    requirement: 'none'
  }
}

export const userRoutes = async (): Promise<Array<Route<unknown>>> => {
  const addUser = await addUserRoute()
  return  makeRoutes(
    addUser
  )
}