import { LimitedModel } from '@/data/protocols'
import { CollectionName } from '@/shared/types'

export interface GetEntityCountForPlanLimitRepository {
  getEntityCount: <T extends LimitedModel> (reference: CollectionName, companyId: T['companyId']) => Promise<number>
}