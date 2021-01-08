// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > Data
import { GetUserByIdRepository } from '@/data/repositories'
// < Only Domain
import { GetUserByAccessTokenUseCase } from '@/domain/usecases'
import { User } from '@/domain/entities'
import { Decrypter } from '@/domain/protocols/cryptography'

@Injectable('getUserByAccessTokenUseCase')
export class GetUserByAccessTokenContract implements GetUserByAccessTokenUseCase {

  constructor (
    @Inject() private readonly decrypter: Decrypter,
    @Inject() private readonly getUserByIdRepository: GetUserByIdRepository
  ) { }

  call = async (accessToken: User['accessToken']): Promise<User | null> => {
    try {
      const decryptedToken = await this.decrypter.decrypt(accessToken as string)
      const id = decryptedToken as User['id']
      const findedUser = await this.getUserByIdRepository.getUserById(id)
      return findedUser?.accessToken ? findedUser : null
    } catch {
      return null
    }
  }
}