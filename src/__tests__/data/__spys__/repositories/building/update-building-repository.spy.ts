import { BuildingModel } from '@/data/models'
import { ModelDto } from '@/data/protocols'
import { UpdateBuildingRepository } from '@/data/repositories'
import { mockBuildingModel } from '@/__tests__/data/__mocks__/models'

export class UpdateBuildingRepositorySpy implements UpdateBuildingRepository {
  buildingId?: BuildingModel['id']
  buildingDto?:  ModelDto<BuildingModel>
  buildingModel?: BuildingModel | null
  shouldReturnNull = false
  shouldThrow = false

  updateBuilding = async (
    buildingId: BuildingModel['id'],
    buildingDto: ModelDto<BuildingModel>
  ): Promise<BuildingModel | null> => {
    this.buildingId = buildingId
    this.buildingDto = buildingDto

    if (this.shouldThrow) throw new Error()

    this.buildingModel = this.shouldReturnNull
      ? null
      : mockBuildingModel(buildingDto)

    return this.buildingModel
  }
}