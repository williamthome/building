import { User } from '@/domain/entities'

export interface UpdateUserAccessTokenUseCase {
  call: (id: User['id'], accessToken: User['accessToken']) => Promise<void>
}
