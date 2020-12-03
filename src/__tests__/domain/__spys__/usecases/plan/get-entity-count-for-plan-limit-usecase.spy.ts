import { CollectionName } from '@/shared/types'
import { CompanyEntity } from '@/domain/entities'
import { LimitedEntity } from '@/domain/protocols'
import { GetEntityCountForPlanLimitUseCase } from '@/domain/usecases'

export class GetEntityCountForPlanLimitUseCaseSpy implements GetEntityCountForPlanLimitUseCase {
  reference?: CollectionName
  companyId?: CompanyEntity['id']
  count?: number
  override?: number
  shouldThrow = false

  call = async <T extends LimitedEntity> (reference: CollectionName, companyId: T['companyId']): Promise<number> => {
    this.reference = reference
    this.companyId = companyId

    if (this.shouldThrow) throw new Error()

    this.count = this.override
      ? this.override
      : 0

    return this.count
  }
}