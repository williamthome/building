import { UserData } from '@/data/models'

export interface UpdateUserAccessTokenRepository {
  updateUserAccessToken: (id: UserData['id'], accessToken: UserData['accessToken']) => Promise<void>
}