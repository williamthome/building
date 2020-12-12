// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { UpdateUserRepository } from '@/data/repositories'
// < Only Domain
import { UpdateUserDto, User } from '@/domain/entities'
import { UpdateUserUseCase } from '@/domain/usecases'

@Injectable('updateUserUseCase')
export class UpdateUserContract implements UpdateUserUseCase {

  constructor (
    @Inject() private readonly updateUserRepository: UpdateUserRepository
  ) {}

  call = async (id: User['id'], dto: UpdateUserDto): Promise<User | null> => {
    return await this.updateUserRepository.updateUser(id, dto)
  }
}