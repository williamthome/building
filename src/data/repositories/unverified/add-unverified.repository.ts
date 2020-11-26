import { ModelDto } from '@/data/protocols'
import { UnverifiedModel } from '@/data/models'

export interface AddUnverifiedRepository {
  addUnverified: (unverifiedDto: ModelDto<UnverifiedModel>) => Promise<UnverifiedModel>
}