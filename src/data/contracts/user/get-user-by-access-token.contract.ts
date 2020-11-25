// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > Data
import { GetUserByIdRepository } from '@/data/repositories'
// < Only Domain
import { GetUserByAccessTokenUseCase } from '@/domain/usecases'
import { UserEntity } from '@/domain/entities'
import { Decrypter } from '@/data/protocols/cryptography'

@Injectable('getUserByAccessTokenUseCase')
export class GetUserByAccessTokenContract implements GetUserByAccessTokenUseCase {

  constructor (
    @Inject() private readonly decrypter: Decrypter,
    @Inject() private readonly getUserByIdRepository: GetUserByIdRepository
  ) {}

  call = async (accessToken: UserEntity['accessToken']): Promise<UserEntity | null> => {
    const decryptedToken = await this.decrypter.decrypt(accessToken as string)
    const id = decryptedToken as UserEntity['id']
    return await this.getUserByIdRepository.getUserById(id)
  }
}