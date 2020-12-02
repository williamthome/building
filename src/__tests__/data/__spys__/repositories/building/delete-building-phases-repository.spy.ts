import { BuildingModel } from '@/data/models'
import { DeleteBuildingPhasesRepository } from '@/data/repositories'

export class DeleteBuildingPhasesRepositorySpy implements DeleteBuildingPhasesRepository {
  buildingId?: BuildingModel['id']
  deletedCount?: number
  shouldReturnZero = false
  shouldThrow = false

  deleteBuildingPhases = async (buildingId: BuildingModel['id']): Promise<number> => {
    this.buildingId = buildingId

    if (this.shouldThrow) throw new Error()

    this.deletedCount = this.shouldReturnZero ? 0 : 1

    return this.deletedCount
  }
}