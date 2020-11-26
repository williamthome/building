import { BuildingEntity } from '@/domain/entities'

export interface GetBuildingByIdUseCase {
  call: (id: BuildingEntity['id']) => Promise<BuildingEntity | null>
}