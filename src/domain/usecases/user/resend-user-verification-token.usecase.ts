import { UserEntity } from '@/domain/entities'

export interface ResendUserVerificationTokenUseCase {
  call: (email: UserEntity['email'], token: string) => Promise<void>
}