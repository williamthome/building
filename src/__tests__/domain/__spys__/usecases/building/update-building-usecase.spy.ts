import { Building, UpdateBuildingDto } from '@/domain/entities'
import { UpdateBuildingUseCase } from '@/domain/usecases'
import { mockBuilding } from '@/__tests__/domain/__mocks__/entities'

export class UpdateBuildingUseCaseSpy implements UpdateBuildingUseCase {
  id?: Building['id']
  dto?:  UpdateBuildingDto
  building?: Building | null
  shouldReturnNull = false
  shouldThrow = false

  call = async (id: Building['id'], dto: UpdateBuildingDto): Promise<Building | null> => {
    this.id = id
    this.dto = dto

    if (this.shouldThrow) throw new Error()

    this.building = this.shouldReturnNull
      ? null
      : mockBuilding(dto)

    return this.building
  }
}