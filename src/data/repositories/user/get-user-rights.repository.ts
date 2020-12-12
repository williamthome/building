import { UserData, UserDataRights } from '@/data/models'

export interface GetUserRightsRepository {
  getUserRights: (id: UserData['id']) => Promise<UserDataRights[]>
}