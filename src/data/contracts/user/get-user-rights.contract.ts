// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > Data
import { GetUserRightsRepository } from '@/data/repositories'
// < Only Domain
import { GetUserRightsUseCase } from '@/domain/usecases'
import { User, UserRights } from '@/domain/entities'

@Injectable('getUserRightsUseCase')
export class GetUserRightsContract implements GetUserRightsUseCase {

  constructor (
    @Inject() private readonly getUserRightsRepository: GetUserRightsRepository
  ) {}

  call = async (id: User['id']): Promise<UserRights[]> => {
    return await this.getUserRightsRepository.getUserRights(id)
  }
}