import { BuildingData, UpdateBuildingData } from '@/data/models'
import { UpdateBuildingRepository } from '@/data/repositories'
import { mockBuildingData } from '@/__tests__/data/__mocks__/models'

export class UpdateBuildingRepositorySpy implements UpdateBuildingRepository {
  id?: BuildingData['id']
  dto?: UpdateBuildingData
  building?: BuildingData | null
  shouldReturnNull = false
  shouldThrow = false

  updateBuilding = async (
    id: BuildingData['id'],
    dto: UpdateBuildingData
  ): Promise<BuildingData | null> => {
    this.id = id
    this.dto = dto

    if (this.shouldThrow) throw new Error()

    this.building = this.shouldReturnNull ? null : mockBuildingData(dto)

    return this.building
  }
}
