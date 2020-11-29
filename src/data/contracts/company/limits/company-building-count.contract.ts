// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { GetCompanyBuildingCountRepository } from '@/data/repositories'
// < Only Domain
import { GetCompanyBuildingCountUseCase } from '@/domain/usecases'
import { CompanyEntity } from '@/domain/entities'

@Injectable('getCompanyBuildingCountUseCase')
export class GetCompanyBuildingCountContract implements GetCompanyBuildingCountUseCase {

  constructor (
    @Inject() private readonly getCompanyBuildingCountRepository: GetCompanyBuildingCountRepository
  ) {}

  call = async (id: CompanyEntity['id']): Promise<number> => {
    return await this.getCompanyBuildingCountRepository.getCompanyBuildingCount(id)
  }
}