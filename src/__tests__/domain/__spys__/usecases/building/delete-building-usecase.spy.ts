import { Building } from '@/domain/entities'
import { DeleteBuildingUseCase } from '@/domain/usecases'
import { mockBuilding } from '@/__tests__/domain/__mocks__/entities'

export class DeleteBuildingUseCaseSpy implements DeleteBuildingUseCase {
  id?: Building['id']
  building?: Building | null
  override?: Partial<Building>
  shouldReturnNull = false
  shouldThrow = false

  call = async (id: Building['id'],): Promise<Building | null> => {
    this.id = id

    if (this.shouldThrow) throw new Error()

    this.building = this.shouldReturnNull
      ? null
      : { ...mockBuilding(), ...this.override }

    return this.building
  }
}