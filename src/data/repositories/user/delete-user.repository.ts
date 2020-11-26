import { UserModel } from '@/data/models'

export interface DeleteUserRepository {
  deleteUser: (companyId: UserModel['id']) => Promise<UserModel | null>
}