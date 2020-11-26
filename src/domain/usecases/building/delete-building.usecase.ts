import { BuildingEntity } from '@/domain/entities'

export interface DeleteBuildingUseCase {
  call: (buildingId: BuildingEntity['id']) => Promise<BuildingEntity | null>
}