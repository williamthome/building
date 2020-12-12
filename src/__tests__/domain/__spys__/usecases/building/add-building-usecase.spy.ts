import { Building, CreateBuildingDto } from '@/domain/entities'
import { AddBuildingUseCase } from '@/domain/usecases'
import { mockBuilding } from '@/__tests__/domain/__mocks__/entities'

export class AddBuildingUseCaseSpy implements AddBuildingUseCase {
  dto?: CreateBuildingDto
  building?: Building
  shouldThrow = false

  call = async (dto: CreateBuildingDto): Promise<Building> => {
    this.dto = dto

    if (this.shouldThrow) throw new Error()

    this.building = mockBuilding(dto)
    return this.building
  }
}