import { BuildingModel } from '@/data/models'

export interface DeleteBuildingRepository {
  deleteBuilding: (buildingId: BuildingModel['id']) => Promise<BuildingModel | null>
}