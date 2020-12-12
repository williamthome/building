import { BuildingData } from '@/data/models'
import { DeleteBuildingRepository } from '@/data/repositories'
import { mockBuildingData } from '@/__tests__/data/__mocks__/models'

export class DeleteBuildingRepositorySpy implements DeleteBuildingRepository {
  id?: BuildingData['id']
  building?: BuildingData | null
  override?: BuildingData
  shouldReturnNull = false
  shouldThrow = false

  deleteBuilding = async (id: BuildingData['id']): Promise<BuildingData | null> => {
    this.id = id

    if (this.shouldThrow) throw new Error()

    this.building = this.shouldReturnNull
      ? null
      : { ...mockBuildingData(), ...this.override }

    return this.building
  }
}