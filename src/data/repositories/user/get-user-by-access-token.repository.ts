import { UserData } from '@/data/models'

export interface GetUserByAccessTokenRepository {
  getUserByAccessToken: (accessToken: UserData['accessToken']) => Promise<UserData | null>
}