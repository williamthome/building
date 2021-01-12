// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > Data
import { GetPhaseByIdRepository } from '@/data/repositories'
// < Only Domain
import { GetPhaseByIdUseCase } from '@/domain/usecases'
import { Phase } from '@/domain/entities'

@Injectable('getPhaseByIdUseCase')
export class GetPhaseByIdContract implements GetPhaseByIdUseCase {
  constructor(@Inject() private readonly getPhaseByIdRepository: GetPhaseByIdRepository) {}

  call = async (id: Phase['id']): Promise<Phase | null> => {
    return await this.getPhaseByIdRepository.getPhaseById(id)
  }
}
