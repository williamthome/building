// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { DeleteUserRepository } from '@/data/repositories'
// < Only Domain
import { UserEntity } from '@/domain/entities'
import { DeleteUserUseCase } from '@/domain/usecases'

@Injectable('deleteUserUseCase')
export class DeleteUserContract implements DeleteUserUseCase {

  constructor (
    @Inject() private readonly deleteUserRepository: DeleteUserRepository
  ) {}

  call = async (userId: UserEntity['id']): Promise<UserEntity | null> => {
    return await this.deleteUserRepository.deleteUser(userId)
  }
}