import { User } from '@/domain/entities'

export interface ResendUserVerificationTokenUseCase {
  call: (email: User['email'], token: string) => Promise<void>
}