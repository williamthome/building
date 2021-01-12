import { User } from '@/domain/entities'

export interface GetUserByAccessTokenUseCase {
  call: (accessToken: User['accessToken']) => Promise<User | null>
}
