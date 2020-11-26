import { UserModel } from '@/data/models'

export interface VerifyUserRepository {
  verifyUser: (id: UserModel['id']) => Promise<UserModel | null>
}