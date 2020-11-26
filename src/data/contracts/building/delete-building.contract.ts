// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { DeleteBuildingRepository } from '@/data/repositories'
// < Only Domain
import { BuildingEntity } from '@/domain/entities'
import { DeleteBuildingUseCase } from '@/domain/usecases'

@Injectable('deleteBuildingUseCase')
export class DeleteBuildingContract implements DeleteBuildingUseCase {

  constructor (
    @Inject() private readonly deleteBuildingRepository: DeleteBuildingRepository
  ) {}

  call = async (buildingId: BuildingEntity['id']): Promise<BuildingEntity | null> => {
    return await this.deleteBuildingRepository.deleteBuilding(buildingId)
  }
}