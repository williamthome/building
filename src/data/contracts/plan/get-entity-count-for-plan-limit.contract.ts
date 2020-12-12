// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
import { CollectionName } from '@/shared/types'
// > Data
import { GetEntityCountForPlanLimitRepository } from '@/data/repositories'
// < Only Domain
import { GetEntityCountForPlanLimitUseCase } from '@/domain/usecases'
import { Company } from '@/domain/entities'

@Injectable('getEntityCountForPlanLimitUseCase')
export class GetEntityCountForPlanLimitContract implements GetEntityCountForPlanLimitUseCase {

  constructor (
    @Inject() private readonly getEntityCountForPlanLimitRepository: GetEntityCountForPlanLimitRepository
  ) { }

  call = async (reference: CollectionName, companyId: Company['id']): Promise<number> => {
    return await this.getEntityCountForPlanLimitRepository.getEntityCount(reference, companyId)
  }
}