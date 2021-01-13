// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > Data
import { GetCompanyBuildingsRepository } from '@/data/repositories'
// < Only Domain
import { GetCompanyBuildingsUseCase } from '@/domain/usecases'
import { Building, Company } from '@/domain/entities'

@Injectable('getCompanyBuildingsUseCase')
export class GetCompanyBuildingsContract implements GetCompanyBuildingsUseCase {
  constructor(
    @Inject() private readonly getCompanyBuildingsRepository: GetCompanyBuildingsRepository
  ) {}

  call = async (id: Company['id']): Promise<Building[]> => {
    return await this.getCompanyBuildingsRepository.getCompanyBuildings(id)
  }
}
