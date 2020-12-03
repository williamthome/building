// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
import { CollectionName } from '@/shared/types'
// > Data
import { LimitedModel } from '@/data/protocols'
import { GetEntityCountForPlanLimitRepository } from '@/data/repositories'
// < Only Domain
import { GetEntityCountForPlanLimitUseCase } from '@/domain/usecases'

@Injectable('getEntityCountForPlanLimitUseCase')
export class GetEntityCountForPlanLimitContract implements GetEntityCountForPlanLimitUseCase {

  constructor (
    @Inject() private readonly getEntityCountForPlanLimitRepository: GetEntityCountForPlanLimitRepository
  ) { }

  call = async <T extends LimitedModel> (reference: CollectionName, companyId: T['companyId']): Promise<number> => {
    return await this.getEntityCountForPlanLimitRepository.getEntityCount(reference, companyId)
  }
}