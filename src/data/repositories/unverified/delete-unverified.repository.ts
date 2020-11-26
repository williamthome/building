import { UnverifiedModel, UserModel } from '@/data/models'

export interface DeleteUnverifiedRepository {
  deleteUnverified: (userId: UserModel['id']) => Promise<UnverifiedModel | null>
}