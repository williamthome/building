// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { AddUserRepository } from '@/data/repositories/user'
// < Only Domain
import { UserEntity } from '@/domain/entities'
import { AddUserUseCase } from '@/domain/usecases/user'

@Injectable('addUserUseCase')
export class AddUserContract implements AddUserUseCase {

  constructor (
    @Inject() private readonly addUserRepository: AddUserRepository
  ) {}

  call = async (userDto: Partial<Omit<UserEntity, 'id'>>): Promise<UserEntity> => {
    return await this.addUserRepository.addUser(userDto)
  }
}