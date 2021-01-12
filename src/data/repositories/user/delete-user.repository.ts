import { UserData } from '@/data/models'

export interface DeleteUserRepository {
  deleteUser: (id: UserData['id']) => Promise<UserData | null>
}
