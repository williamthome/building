// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > Data
import { GetUserByEmailRepository } from '@/data/repositories/user'
// < Only Domain
import { GetUserByEmailUseCase } from '@/domain/usecases/user'
import { UserEntity } from '@/domain/entities'

@Injectable('getUserByEmailUseCase')
export class GetUserByEmailContract implements GetUserByEmailUseCase {

  constructor (
    @Inject() private readonly getUserByEmailRepository: GetUserByEmailRepository
  ) {}

  call = async (email: UserEntity['email']): Promise<UserEntity | null> => {
    return await this.getUserByEmailRepository.getUserByEmail(email)
  }
}