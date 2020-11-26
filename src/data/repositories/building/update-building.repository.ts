import { ModelDto } from '@/data/protocols'
import { BuildingModel } from '@/data/models'

export interface UpdateBuildingRepository {
  updateBuilding: (
    buildingId: BuildingModel['id'],
    buildingDto: ModelDto<BuildingModel>
  ) => Promise<BuildingModel | null>
}