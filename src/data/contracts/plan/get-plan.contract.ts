// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { GetPlanRepository } from '@/data/repositories'
// < Only Domain
import { PlanEntity } from '@/domain/entities'
import { GetPlanUseCase } from '@/domain/usecases'

@Injectable('getPlanUseCase')
export class GetPlanContract implements GetPlanUseCase {

  constructor (
    @Inject() private readonly getPlanRepository: GetPlanRepository
  ) { }

  call = async (id: PlanEntity['id']): Promise<PlanEntity | null> => {
    return await this.getPlanRepository.getPlan(id)
  }
}