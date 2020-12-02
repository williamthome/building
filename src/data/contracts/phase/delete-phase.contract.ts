// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { DeletePhaseRepository } from '@/data/repositories'
// < Only Domain
import { PhaseEntity } from '@/domain/entities'
import { DeletePhaseUseCase } from '@/domain/usecases'

@Injectable('deletePhaseUseCase')
export class DeletePhaseContract implements DeletePhaseUseCase {

  constructor (
    @Inject() private readonly deletePhaseRepository: DeletePhaseRepository
  ) {}

  call = async (projectId: PhaseEntity['id']): Promise<PhaseEntity | null> => {
    return await this.deletePhaseRepository.deletePhase(projectId)
  }
}