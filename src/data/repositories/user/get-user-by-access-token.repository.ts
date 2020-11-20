import { UserModel } from '@/data/models'

export interface GetUserByAccessTokenRepository {
  getUserByAccessToken: (accessToken: UserModel['accessToken']) => Promise<UserModel | null>
}