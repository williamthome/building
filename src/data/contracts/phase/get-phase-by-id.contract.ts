// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > Data
import { GetPhaseByIdRepository } from '@/data/repositories'
// < Only Domain
import { GetPhaseByIdUseCase } from '@/domain/usecases'
import { PhaseEntity } from '@/domain/entities'

@Injectable('getPhaseByIdUseCase')
export class GetPhaseByIdContract implements GetPhaseByIdUseCase {

  constructor (
    @Inject() private readonly getPhaseByIdRepository: GetPhaseByIdRepository
  ) {}

  call = async (id: PhaseEntity['id']): Promise<PhaseEntity | null> => {
    return await this.getPhaseByIdRepository.getPhaseById(id)
  }
}