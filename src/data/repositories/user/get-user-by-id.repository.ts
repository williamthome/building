import { UserData } from '@/data/models'

export interface GetUserByIdRepository {
  getUserById: (id: UserData['id']) => Promise<UserData | null>
}