// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { AddBuildingRepository } from '@/data/repositories'
// < Only Domain
import { Building, Company, CreateBuildingDto } from '@/domain/entities'
import { AddBuildingUseCase } from '@/domain/usecases'

@Injectable('addBuildingUseCase')
export class AddBuildingContract implements AddBuildingUseCase {

  constructor (
    @Inject() private readonly addBuildingRepository: AddBuildingRepository
  ) {}

  call = async (dto: CreateBuildingDto, companyId: Company['id']): Promise<Building> => {
    return await this.addBuildingRepository.addBuilding({
      ...dto,
      companyId
    })
  }
}