import { UserModel } from '@/data/models'

export interface GetUserByIdRepository {
  getUserById: (id: UserModel['id']) => Promise<UserModel | null>
}