import { UserModel } from '@/data/models'

export interface UpdateUserAccessTokenRepository {
  updateUserAccessToken: (
    id: UserModel['id'],
    accessToken: UserModel['accessToken']
  ) => Promise<void>
}