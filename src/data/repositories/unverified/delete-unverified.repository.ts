import { UnverifiedData } from '@/data/models'

export interface DeleteUnverifiedRepository {
  deleteUnverified: (userId: UnverifiedData['userId']) => Promise<UnverifiedData | null>
}