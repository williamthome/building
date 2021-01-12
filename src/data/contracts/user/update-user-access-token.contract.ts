// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > Data
import { UpdateUserAccessTokenRepository } from '@/data/repositories'
// < Only Domain
import { UpdateUserAccessTokenUseCase } from '@/domain/usecases'
import { User } from '@/domain/entities'

@Injectable('updateUserAccessTokenUseCase')
export class UpdateUserAccessTokenContract implements UpdateUserAccessTokenUseCase {
  constructor(
    @Inject() private readonly updateUserAccessTokenRepository: UpdateUserAccessTokenRepository
  ) {}

  call = async (id: User['id'], accessToken: User['accessToken']): Promise<void> => {
    await this.updateUserAccessTokenRepository.updateUserAccessToken(id, accessToken)
  }
}
