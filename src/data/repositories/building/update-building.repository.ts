import { BuildingModelDto } from '@/data/protocols'
import { BuildingModel } from '@/data/models'

export interface UpdateBuildingRepository {
  updateBuilding: (
    buildingId: BuildingModel['id'],
    buildingDto: BuildingModelDto
  ) => Promise<BuildingModel | null>
}