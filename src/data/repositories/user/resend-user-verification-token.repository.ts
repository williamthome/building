import { UserModel } from '@/data/models'

export interface ResendUserVerificationTokenRepository {
  resendUserVerificationToken: (email: UserModel['email'], token: string) => Promise<void>
}