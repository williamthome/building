// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { AddPhaseRepository } from '@/data/repositories'
// < Only Domain
import { Phase, Company, CreatePhaseDto } from '@/domain/entities'
import { AddPhaseUseCase } from '@/domain/usecases'

@Injectable('addPhaseUseCase')
export class AddPhaseContract implements AddPhaseUseCase {

  constructor (
    @Inject() private readonly addPhaseRepository: AddPhaseRepository
  ) { }

  call = async (dto: CreatePhaseDto, companyId: Company['id']): Promise<Phase> => {
    return await this.addPhaseRepository.addPhase({
      ...dto,
      companyId
    })
  }
}