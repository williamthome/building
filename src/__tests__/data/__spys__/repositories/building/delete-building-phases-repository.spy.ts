import { BuildingData } from '@/data/models'
import { DeleteBuildingPhasesRepository } from '@/data/repositories'

export class DeleteBuildingPhasesRepositorySpy implements DeleteBuildingPhasesRepository {
  id?: BuildingData['id']
  deletedCount?: number
  shouldReturnZero = false
  shouldThrow = false

  deleteBuildingPhases = async (id: BuildingData['id']): Promise<number> => {
    this.id = id

    if (this.shouldThrow) throw new Error()

    this.deletedCount = this.shouldReturnZero ? 0 : 1

    return this.deletedCount
  }
}
