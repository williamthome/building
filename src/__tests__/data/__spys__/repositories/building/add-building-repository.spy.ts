import { BuildingData, CreateBuildingData } from '@/data/models'
import { AddBuildingRepository } from '@/data/repositories'
import { mockBuildingData } from '@/__tests__/data/__mocks__/models'

export class AddBuildingRepositorySpy implements AddBuildingRepository {
  dto?: CreateBuildingData
  building?: BuildingData
  shouldThrow = false

  addBuilding = async (dto: CreateBuildingData): Promise<BuildingData> => {
    this.dto = dto

    if (this.shouldThrow) throw new Error()

    this.building = mockBuildingData(dto)
    return this.building
  }
}