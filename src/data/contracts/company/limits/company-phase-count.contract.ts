// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { GetCompanyPhaseCountRepository } from '@/data/repositories'
// < Only Domain
import { GetCompanyPhaseCountUseCase } from '@/domain/usecases'
import { CompanyEntity } from '@/domain/entities'

@Injectable('getCompanyPhaseCountUseCase')
export class GetCompanyPhaseCountContract implements GetCompanyPhaseCountUseCase {

  constructor (
    @Inject() private readonly getCompanyPhaseCountRepository: GetCompanyPhaseCountRepository
  ) {}

  call = async (id: CompanyEntity['id']): Promise<number> => {
    return await this.getCompanyPhaseCountRepository.getCompanyPhaseCount(id)
  }
}