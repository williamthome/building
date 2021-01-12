// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { UpdatePhaseRepository } from '@/data/repositories'
// < Only Domain
import { Phase, UpdatePhaseDto } from '@/domain/entities'
import { UpdatePhaseUseCase } from '@/domain/usecases'

@Injectable('updatePhaseUseCase')
export class UpdatePhaseContract implements UpdatePhaseUseCase {
  constructor(@Inject() private readonly updatePhaseRepository: UpdatePhaseRepository) {}

  call = async (id: Phase['id'], dto: UpdatePhaseDto): Promise<Phase | null> => {
    return await this.updatePhaseRepository.updatePhase(id, dto)
  }
}
