import { CompanyData } from '@/data/models'
import { CollectionName } from '@/shared/types'

export interface GetEntityCountForPlanLimitRepository {
  getEntityCount: (reference: CollectionName, companyId: CompanyData['id']) => Promise<number>
}
