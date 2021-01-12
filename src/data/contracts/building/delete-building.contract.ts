// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import {
  DeleteBuildingPhasesRepository,
  DeleteBuildingProjectsRepository,
  DeleteBuildingRepository
} from '@/data/repositories'
// < Only Domain
import { Building } from '@/domain/entities'
import { DeleteBuildingUseCase } from '@/domain/usecases'

@Injectable('deleteBuildingUseCase')
export class DeleteBuildingContract implements DeleteBuildingUseCase {
  constructor(
    @Inject()
    private readonly deleteBuildingProjectsRepository: DeleteBuildingProjectsRepository,

    @Inject()
    private readonly deleteBuildingPhasesRepository: DeleteBuildingPhasesRepository,

    @Inject()
    private readonly deleteBuildingRepository: DeleteBuildingRepository
  ) {}

  call = async (id: Building['id']): Promise<Building | null> => {
    const building = await this.deleteBuildingRepository.deleteBuilding(id)
    if (!building) return null

    await this.deleteBuildingProjectsRepository.deleteBuildingProjects(id)
    await this.deleteBuildingPhasesRepository.deleteBuildingPhases(id)

    return building
  }
}
