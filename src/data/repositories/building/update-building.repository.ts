import { BuildingData, UpdateBuildingData } from '@/data/models'

export interface UpdateBuildingRepository {
  updateBuilding: (id: BuildingData['id'], dto: UpdateBuildingData) => Promise<BuildingData | null>
}
