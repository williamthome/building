// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { GetPlanByIdRepository } from '@/data/repositories'
// < Only Domain
import { PlanEntity } from '@/domain/entities'
import { GetPlanByIdUseCase } from '@/domain/usecases'

@Injectable('getPlanByIdUseCase')
export class GetPlanByIdContract implements GetPlanByIdUseCase {

  constructor (
    @Inject() private readonly getPlanByIdRepository: GetPlanByIdRepository
  ) { }

  call = async (id: PlanEntity['id']): Promise<PlanEntity | null> => {
    return await this.getPlanByIdRepository.getPlanById(id)
  }
}