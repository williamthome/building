// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { AddBuildingRepository } from '@/data/repositories'
// < Only Domain
import { BuildingEntity, CompanyEntity } from '@/domain/entities'
import { AddBuildingUseCase } from '@/domain/usecases'
import { BuildingDto } from '@/domain/protocols'

@Injectable('addBuildingUseCase')
export class AddBuildingContract implements AddBuildingUseCase {

  constructor (
    @Inject() private readonly addBuildingRepository: AddBuildingRepository
  ) {}

  call = async (buildingDto: BuildingDto, companyId: CompanyEntity['id']): Promise<BuildingEntity> => {
    return await this.addBuildingRepository.addBuilding({
      ...buildingDto,
      companyId
    })
  }
}