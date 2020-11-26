import { BuildingEntity } from '@/domain/entities'
import { BuildingDto } from '@/domain/protocols'

export interface UpdateBuildingUseCase {
  call: (buildingId: BuildingEntity['id'], buildingDto: BuildingDto) => Promise<BuildingEntity | null>
}