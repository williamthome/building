import { AddUserRepository } from '@/data/repositories/user/add-user.repository'
import { UserEntity } from '@/domain/entities'
import { AddUserUseCase } from '@/domain/usecases/user/add-user.usecase'

export class AddUserContract implements AddUserUseCase {

  constructor (private readonly addUserRepository: AddUserRepository) {}

  call = async (userDto: Partial<UserEntity>): Promise<UserEntity> => {
    return await this.addUserRepository.addUser(userDto)
  }
}