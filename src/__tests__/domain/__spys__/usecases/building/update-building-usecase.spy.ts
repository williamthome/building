import { BuildingEntity } from '@/domain/entities'
import { BuildingDto } from '@/domain/protocols'
import { UpdateBuildingUseCase } from '@/domain/usecases'
import { mockBuildingEntity } from '@/__tests__/domain/__mocks__/entities'

export class UpdateBuildingUseCaseSpy implements UpdateBuildingUseCase {
  buildingId?: BuildingEntity['id']
  buildingDto?:  BuildingDto
  buildingEntity?: BuildingEntity | null
  shouldReturnNull = false
  shouldThrow = false

  call = async (
    buildingId: BuildingEntity['id'],
    buildingDto: BuildingDto
  ): Promise<BuildingEntity | null> => {
    this.buildingId = buildingId
    this.buildingDto = buildingDto

    if (this.shouldThrow) throw new Error()

    this.buildingEntity = this.shouldReturnNull
      ? null
      : mockBuildingEntity(buildingDto)

    return this.buildingEntity
  }
}