import { BuildingModel } from '@/data/models'
import { DeleteBuildingProjectsRepository } from '@/data/repositories'

export class DeleteBuildingProjectsRepositorySpy implements DeleteBuildingProjectsRepository {
  buildingId?: BuildingModel['id']
  deletedCount?: number
  shouldReturnZero = false
  shouldThrow = false

  deleteBuildingProjects = async (buildingId: BuildingModel['id']): Promise<number> => {
    this.buildingId = buildingId

    if (this.shouldThrow) throw new Error()

    this.deletedCount = this.shouldReturnZero ? 0 : 1

    return this.deletedCount
  }
}