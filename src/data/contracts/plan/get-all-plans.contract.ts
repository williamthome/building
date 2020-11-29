// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { GetAllPlansRepository } from '@/data/repositories'
// < Only Domain
import { PlanEntity } from '@/domain/entities'
import { GetAllPlansUseCase } from '@/domain/usecases'

@Injectable('getAllPlansUseCase')
export class GetAllPlansContract implements GetAllPlansUseCase {

  constructor (
    @Inject() private readonly getAllPlansRepository: GetAllPlansRepository
  ) { }

  call = async (): Promise<PlanEntity[]> => {
    return await this.getAllPlansRepository.getAllPlans()
  }
}