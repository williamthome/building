import { LimitedEntity } from '@/domain/protocols'
import { CollectionName } from '@/shared/types'

export interface GetEntityCountForPlanLimitUseCase {
  call: <T extends LimitedEntity> (reference: CollectionName, companyId: T['companyId']) => Promise<number>
}