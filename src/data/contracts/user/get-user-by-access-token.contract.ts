// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > Data
import { GetUserByAccessTokenRepository } from '@/data/repositories'
// < Only Domain
import { GetUserByAccessTokenUseCase } from '@/domain/usecases'
import { UserEntity } from '@/domain/entities'

@Injectable('getUserByAccessTokenUseCase')
export class GetUserByAccessTokenContract implements GetUserByAccessTokenUseCase {

  constructor (
    @Inject() private readonly getUserByAccessTokenRepository: GetUserByAccessTokenRepository
  ) {}

  call = async (accessToken: UserEntity['accessToken']): Promise<UserEntity | null> => {
    return await this.getUserByAccessTokenRepository.getUserByAccessToken(accessToken)
  }
}