import { UserModel } from '@/data/models'

export interface GetUserByEmailRepository {
  getUserByEmail: (email: UserModel['email']) => Promise<UserModel | null>
}