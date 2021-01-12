import { OmitKey } from '@/shared/types'
import { User } from '../entities'

export type UserResponse = OmitKey<User, 'password'>

export interface UserVerificationTokenResponse {
  user: UserResponse
  verificationToken: string
}
