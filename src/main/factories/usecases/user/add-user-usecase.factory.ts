import { AddUserContract } from '@/data/contracts/user/add-user.contract'
import { AddUserUseCase } from '@/domain/usecases/user/add-user.usecase'
import userMongoRepository from '@/infra/db/mongo/repositories/user.mongo-repository'

export const makeAddUserUsecase = (): AddUserUseCase => {
  return new AddUserContract(userMongoRepository)
}