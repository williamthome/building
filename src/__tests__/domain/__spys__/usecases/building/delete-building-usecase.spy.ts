import { BuildingEntity } from '@/domain/entities'
import { DeleteBuildingUseCase } from '@/domain/usecases'
import { mockBuildingEntity } from '@/__tests__/domain/__mocks__/entities'

export class DeleteBuildingUseCaseSpy implements DeleteBuildingUseCase {
  buildingId?: BuildingEntity['id']
  buildingEntity?: BuildingEntity | null
  override?: BuildingEntity
  shouldReturnNull = false
  shouldThrow = false

  call = async (buildingId: BuildingEntity['id'],): Promise<BuildingEntity | null> => {
    this.buildingId = buildingId

    if (this.shouldThrow) throw new Error()

    this.buildingEntity = this.shouldReturnNull
      ? null
      : { ...mockBuildingEntity(), ...this.override }

    return this.buildingEntity
  }
}