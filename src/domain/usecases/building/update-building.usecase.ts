import { Building, UpdateBuildingDto } from '@/domain/entities'

export interface UpdateBuildingUseCase {
  call: (id: Building['id'], dto: UpdateBuildingDto) => Promise<Building | null>
}