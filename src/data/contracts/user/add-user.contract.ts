// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { AddUserRepository } from '@/data/repositories/user'
// < Only Domain
import { UserEntity } from '@/domain/entities'
import { AddUserUseCase } from '@/domain/usecases/user'
import { UserDto } from '@/domain/protocols'

@Injectable('addUserUseCase')
export class AddUserContract implements AddUserUseCase {

  constructor (
    @Inject() private readonly addUserRepository: AddUserRepository
  ) {}

  call = async (userDto: UserDto): Promise<UserEntity> => {
    return await this.addUserRepository.addUser(userDto)
  }
}