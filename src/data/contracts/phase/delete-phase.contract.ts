// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { DeletePhaseProjectsRepository, DeletePhaseRepository } from '@/data/repositories'
// < Only Domain
import { PhaseEntity } from '@/domain/entities'
import { DeletePhaseUseCase } from '@/domain/usecases'

@Injectable('deletePhaseUseCase')
export class DeletePhaseContract implements DeletePhaseUseCase {

  constructor (
    @Inject()
    private readonly deletePhaseProjectsRepository: DeletePhaseProjectsRepository,

    @Inject() private readonly deletePhaseRepository: DeletePhaseRepository
  ) {}

  call = async (id: PhaseEntity['id']): Promise<PhaseEntity | null> => {
    const phase = await this.deletePhaseRepository.deletePhase(id)
    if (!phase) return null

    await this.deletePhaseProjectsRepository.deletePhaseProjects(id)

    return phase
  }
}