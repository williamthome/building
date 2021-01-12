import { UpdateUserData, UserData } from '@/data/models'

export interface UpdateUserRepository {
  updateUser: (id: UserData['id'], dto: UpdateUserData) => Promise<UserData | null>
}
