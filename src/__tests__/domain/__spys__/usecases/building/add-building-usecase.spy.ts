import { BuildingEntity } from '@/domain/entities'
import { BuildingDto } from '@/domain/protocols'
import { AddBuildingUseCase } from '@/domain/usecases'
import { mockBuildingEntity } from '@/__tests__/domain/__mocks__/entities'

export class AddBuildingUseCaseSpy implements AddBuildingUseCase {
  buildingDto?:  BuildingDto
  buildingEntity?: BuildingEntity
  shouldThrow = false

  call = async (buildingDto: BuildingDto): Promise<BuildingEntity> => {
    this.buildingDto = buildingDto

    if (this.shouldThrow) throw new Error()

    this.buildingEntity = mockBuildingEntity(buildingDto)
    return this.buildingEntity
  }
}