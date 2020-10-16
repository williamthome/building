import { AddUserRepository } from '@/data/repositories/user/add-user.repository'
import { UserEntity } from '@/domain/entities'
import { EntityDto } from '@/domain/protocols'
import { AddUserUseCase } from '@/domain/usecases/user/add-user.usecase'

export class AddUserContract implements AddUserUseCase {

  constructor (private readonly addUserRepository: AddUserRepository) {}

  call = async (userDto: EntityDto<UserEntity>): Promise<UserEntity> => {
    return await this.addUserRepository.addUser(userDto)
  }
}