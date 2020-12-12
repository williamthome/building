import { CreateUnverifiedData, UnverifiedData } from '@/data/models'

export interface AddUnverifiedRepository {
  addUnverified: (dto: CreateUnverifiedData) => Promise<UnverifiedData>
}