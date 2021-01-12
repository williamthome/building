import { BuildingData } from '@/data/models'

export interface DeleteBuildingRepository {
  deleteBuilding: (id: BuildingData['id']) => Promise<BuildingData | null>
}
