import { UserEntity } from '@/domain/entities'
import { AddUserController } from '@/presentation/controllers/user/add-user.controller'
import { Controller } from '@/presentation/protocols'
import { makeAddUserUsecase } from '../../usecases/user'

export const makeAddUserController = (): Controller<UserEntity> => {
  return new AddUserController(makeAddUserUsecase())
}