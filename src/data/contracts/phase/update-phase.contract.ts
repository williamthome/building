// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { UpdatePhaseRepository } from '@/data/repositories'
// < Only Domain
import { PhaseEntity } from '@/domain/entities'
import { UpdatePhaseUseCase } from '@/domain/usecases'
import { PhaseEntityDto } from '@/domain/protocols'

@Injectable('updatePhaseUseCase')
export class UpdatePhaseContract implements UpdatePhaseUseCase {

  constructor (
    @Inject() private readonly updatePhaseRepository: UpdatePhaseRepository
  ) {}

  call = async (id: PhaseEntity['id'], dto: PhaseEntityDto): Promise<PhaseEntity | null> => {
    return await this.updatePhaseRepository.updatePhase(id, dto)
  }
}