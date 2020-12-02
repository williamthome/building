import { Injectable } from '@/shared/dependency-injection'
import { ResendUserVerificationTokenRepository } from '@/data/repositories'

@Injectable('resendUserVerificationTokenRepository')
export class DbResendUserVerificationTokenRepository implements ResendUserVerificationTokenRepository {
  resendUserVerificationToken = async (): Promise<void> => {
    return
  }
}