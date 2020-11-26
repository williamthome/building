import { UserModel } from '@/data/models'
import { UserRights } from '@/domain/protocols'

export interface GetUserRightsRepository {
  getUserRights: (id: UserModel['id']) => Promise<UserRights[]>
}