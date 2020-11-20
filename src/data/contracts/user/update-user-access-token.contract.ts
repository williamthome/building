// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > Data
import { UpdateUserAccessTokenRepository } from '@/data/repositories/user'
// < Only Domain
import { UpdateUserAccessTokenUseCase } from '@/domain/usecases/user'
import { UserEntity } from '@/domain/entities'

@Injectable('updateUserAccessTokenUseCase')
export class UpdateUserAccessTokenContract implements UpdateUserAccessTokenUseCase {

  constructor (
    @Inject() private readonly updateUserAccessTokenRepository: UpdateUserAccessTokenRepository
  ) { }

  call = async (id: UserEntity['id'], accessToken: UserEntity['accessToken']): Promise<void> => {
    await this.updateUserAccessTokenRepository.updateUserAccessToken(id, accessToken)
  }
}