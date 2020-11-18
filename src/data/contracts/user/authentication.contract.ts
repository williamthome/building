// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > Data
import { AuthenticationRepository, AuthModelDto } from '@/data/repositories/user'
// < Only Domain
import { AuthenticationUseCase } from '@/domain/usecases/user'
import { UserEntity } from '@/domain/entities'

@Injectable('authenticationUseCase')
export class AuthenticationContract implements AuthenticationUseCase {

  constructor (
    @Inject() private readonly authenticationRepository: AuthenticationRepository
  ) {}

  call = async (authDto: AuthModelDto): Promise<UserEntity | null> => {
    return await this.authenticationRepository.authenticate(authDto)
  }
}