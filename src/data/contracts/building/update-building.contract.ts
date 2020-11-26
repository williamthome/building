// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { UpdateBuildingRepository } from '@/data/repositories'
// < Only Domain
import { BuildingEntity } from '@/domain/entities'
import { UpdateBuildingUseCase } from '@/domain/usecases'
import { BuildingDto } from '@/domain/protocols'

@Injectable('updateBuildingUseCase')
export class UpdateBuildingContract implements UpdateBuildingUseCase {

  constructor (
    @Inject() private readonly updateBuildingRepository: UpdateBuildingRepository
  ) {}

  call = async (buildingId: BuildingEntity['id'],buildingDto: BuildingDto): Promise<BuildingEntity | null> => {
    return await this.updateBuildingRepository.updateBuilding(buildingId, buildingDto)
  }
}