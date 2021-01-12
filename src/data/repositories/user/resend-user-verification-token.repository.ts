import { UserData } from '@/data/models'

export interface ResendUserVerificationTokenRepository {
  resendUserVerificationToken: (email: UserData['email'], token: string) => Promise<void>
}
