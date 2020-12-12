// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > Data
import { GetUserByIdRepository } from '@/data/repositories'
// < Only Domain
import { GetUserByIdUseCase } from '@/domain/usecases'
import { User } from '@/domain/entities'

@Injectable('getUserByIdUseCase')
export class GetUserByIdContract implements GetUserByIdUseCase {

  constructor (
    @Inject() private readonly getUserByIdRepository: GetUserByIdRepository
  ) {}

  call = async (id: User['id']): Promise<User | null> => {
    return await this.getUserByIdRepository.getUserById(id)
  }
}