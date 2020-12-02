// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { AddPhaseRepository } from '@/data/repositories'
// < Only Domain
import { PhaseEntity, CompanyEntity } from '@/domain/entities'
import { AddPhaseUseCase } from '@/domain/usecases'
import { PhaseEntityDto } from '@/domain/protocols'

@Injectable('addPhaseUseCase')
export class AddPhaseContract implements AddPhaseUseCase {

  constructor (
    @Inject() private readonly addPhaseRepository: AddPhaseRepository
  ) { }

  call = async (
    dto: PhaseEntityDto,
    companyId: CompanyEntity['id']
  ): Promise<PhaseEntity> => {
    return await this.addPhaseRepository.addPhase({
      ...dto,
      companyId
    })
  }
}