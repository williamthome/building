// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { GetAllPlansRepository } from '@/data/repositories'
// < Only Domain
import { Plan } from '@/domain/entities'
import { GetAllPlansUseCase } from '@/domain/usecases'

@Injectable('getAllPlansUseCase')
export class GetAllPlansContract implements GetAllPlansUseCase {
  constructor(@Inject() private readonly getAllPlansRepository: GetAllPlansRepository) {}

  call = async (): Promise<Plan[]> => {
    return await this.getAllPlansRepository.getAllPlans()
  }
}
