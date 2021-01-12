import { BuildingData } from '@/data/models'
import { DeleteBuildingProjectsRepository } from '@/data/repositories'

export class DeleteBuildingProjectsRepositorySpy implements DeleteBuildingProjectsRepository {
  id?: BuildingData['id']
  deletedCount?: number
  shouldReturnZero = false
  shouldThrow = false

  deleteBuildingProjects = async (id: BuildingData['id']): Promise<number> => {
    this.id = id

    if (this.shouldThrow) throw new Error()

    this.deletedCount = this.shouldReturnZero ? 0 : 1

    return this.deletedCount
  }
}
