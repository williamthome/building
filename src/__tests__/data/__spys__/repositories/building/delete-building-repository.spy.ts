import { BuildingModel } from '@/data/models'
import { DeleteBuildingRepository } from '@/data/repositories'
import { mockBuildingModel } from '@/__tests__/data/__mocks__/models'

export class DeleteBuildingRepositorySpy implements DeleteBuildingRepository {
  buildingId?: BuildingModel['id']
  buildingModel?: BuildingModel | null
  override?: BuildingModel
  shouldReturnNull = false
  shouldThrow = false

  deleteBuilding = async (buildingId: BuildingModel['id']): Promise<BuildingModel | null> => {
    this.buildingId = buildingId

    if (this.shouldThrow) throw new Error()

    this.buildingModel = this.shouldReturnNull
      ? null
      : { ...mockBuildingModel(), ...this.override }

    return this.buildingModel
  }
}