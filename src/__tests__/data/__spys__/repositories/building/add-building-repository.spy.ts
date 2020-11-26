import { BuildingModel } from '@/data/models'
import { ModelDto } from '@/data/protocols'
import { AddBuildingRepository } from '@/data/repositories'
import { mockBuildingModel } from '@/__tests__/data/__mocks__/models'

export class AddBuildingRepositorySpy implements AddBuildingRepository {
  buildingDto?:  ModelDto<BuildingModel>
  buildingModel?: BuildingModel
  shouldThrow = false

  addBuilding = async (buildingDto: ModelDto<BuildingModel>): Promise<BuildingModel> => {
    this.buildingDto = buildingDto

    if (this.shouldThrow) throw new Error()

    this.buildingModel = mockBuildingModel(buildingDto)
    return this.buildingModel
  }
}