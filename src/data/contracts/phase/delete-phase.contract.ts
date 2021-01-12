// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { DeletePhaseProjectsRepository, DeletePhaseRepository } from '@/data/repositories'
// < Only Domain
import { Phase } from '@/domain/entities'
import { DeletePhaseUseCase } from '@/domain/usecases'

@Injectable('deletePhaseUseCase')
export class DeletePhaseContract implements DeletePhaseUseCase {
  constructor(
    @Inject()
    private readonly deletePhaseProjectsRepository: DeletePhaseProjectsRepository,

    @Inject() private readonly deletePhaseRepository: DeletePhaseRepository
  ) {}

  call = async (id: Phase['id']): Promise<Phase | null> => {
    const phase = await this.deletePhaseRepository.deletePhase(id)
    if (!phase) return null

    await this.deletePhaseProjectsRepository.deletePhaseProjects(id)

    return phase
  }
}
