// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { UpdateUserRepository } from '@/data/repositories'
// < Only Domain
import { UserEntity } from '@/domain/entities'
import { UpdateUserUseCase } from '@/domain/usecases'
import { UserEntityDto } from '@/domain/protocols'

@Injectable('updateUserUseCase')
export class UpdateUserContract implements UpdateUserUseCase {

  constructor (
    @Inject() private readonly updateUserRepository: UpdateUserRepository
  ) {}

  call = async (userId: UserEntity['id'],userDto: UserEntityDto): Promise<UserEntity | null> => {
    return await this.updateUserRepository.updateUser(userId, userDto)
  }
}