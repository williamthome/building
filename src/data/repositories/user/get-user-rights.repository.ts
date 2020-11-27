import { UserModel, UserModelRights } from '@/data/models'

export interface GetUserRightsRepository {
  getUserRights: (id: UserModel['id']) => Promise<UserModelRights[]>
}