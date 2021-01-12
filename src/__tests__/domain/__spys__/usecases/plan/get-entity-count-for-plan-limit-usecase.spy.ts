import { CollectionName } from '@/shared/types'
import { GetEntityCountForPlanLimitUseCase } from '@/domain/usecases'
import { Company } from '@/domain/entities'

export class GetEntityCountForPlanLimitUseCaseSpy implements GetEntityCountForPlanLimitUseCase {
  reference?: CollectionName
  companyId?: Company['id']
  count?: number
  override?: number
  shouldThrow = false

  call = async (reference: CollectionName, companyId: Company['id']): Promise<number> => {
    this.reference = reference
    this.companyId = companyId

    if (this.shouldThrow) throw new Error()

    this.count = this.override ? this.override : 0

    return this.count
  }
}
