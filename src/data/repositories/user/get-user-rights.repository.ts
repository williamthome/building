import { UserModel } from '@/data/models'
import { UserModelRights } from '@/data/protocols'

export interface GetUserRightsRepository {
  getUserRights: (id: UserModel['id']) => Promise<UserModelRights[]>
}