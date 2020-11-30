import { BuildingModel } from '@/data/models'
import { BuildingModelDto } from '@/data/protocols'
import { AddBuildingRepository } from '@/data/repositories'
import { mockBuildingModel } from '@/__tests__/data/__mocks__/models'

export class AddBuildingRepositorySpy implements AddBuildingRepository {
  buildingDto?:  BuildingModelDto
  buildingModel?: BuildingModel
  shouldThrow = false

  addBuilding = async (buildingDto: BuildingModelDto): Promise<BuildingModel> => {
    this.buildingDto = buildingDto

    if (this.shouldThrow) throw new Error()

    this.buildingModel = mockBuildingModel(buildingDto)
    return this.buildingModel
  }
}