import { CollectionName } from '@/shared/types'
import { Company } from '@/domain/entities'

export interface GetEntityCountForPlanLimitUseCase {
  call: (reference: CollectionName, companyId: Company['id']) => Promise<number>
}