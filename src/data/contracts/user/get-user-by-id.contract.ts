// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > Data
import { GetUserByIdRepository } from '@/data/repositories'
// < Only Domain
import { GetUserByIdUseCase } from '@/domain/usecases'
import { UserEntity } from '@/domain/entities'

@Injectable('getUserByIdUseCase')
export class GetUserByIdContract implements GetUserByIdUseCase {

  constructor (
    @Inject() private readonly getUserByIdRepository: GetUserByIdRepository
  ) {}

  call = async (id: UserEntity['id']): Promise<UserEntity | null> => {
    return await this.getUserByIdRepository.getUserById(id)
  }
}