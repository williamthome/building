// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { ResendUserVerificationTokenRepository } from '@/data/repositories'
// < Only Domain
import { User } from '@/domain/entities'
import { ResendUserVerificationTokenUseCase } from '@/domain/usecases'

@Injectable('resendUserVerificationTokenUseCase')
export class ResendUserVerificationTokenContract implements ResendUserVerificationTokenUseCase {

  constructor (
    @Inject() private readonly resendUserVerificationTokenRepository: ResendUserVerificationTokenRepository
  ) { }

  call = async (email: User['email'], token: string): Promise<void> => {
    await this.resendUserVerificationTokenRepository.resendUserVerificationToken(email, token)
  }
}