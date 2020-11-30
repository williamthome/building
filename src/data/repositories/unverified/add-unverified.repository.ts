import { UnverifiedModel } from '@/data/models'
import { UnverifiedModelDto } from '@/data/protocols'

export interface AddUnverifiedRepository {
  addUnverified: (unverifiedDto: UnverifiedModelDto) => Promise<UnverifiedModel>
}