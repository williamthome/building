import { CreateBuildingData, BuildingData } from '@/data/models'

export interface AddBuildingRepository {
  addBuilding: (dto: CreateBuildingData) => Promise<BuildingData>
}
