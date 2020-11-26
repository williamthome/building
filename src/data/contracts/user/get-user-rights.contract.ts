// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > Data
import { GetUserRightsRepository } from '@/data/repositories'
// < Only Domain
import { GetUserRightsUseCase } from '@/domain/usecases'
import { UserEntity } from '@/domain/entities'
import { UserRights } from '@/domain/protocols'

@Injectable('getUserRightsUseCase')
export class GetUserRightsContract implements GetUserRightsUseCase {

  constructor (
    @Inject() private readonly getUserRightsRepository: GetUserRightsRepository
  ) {}

  call = async (id: UserEntity['id']): Promise<UserRights[]> => {
    return await this.getUserRightsRepository.getUserRights(id)
  }
}