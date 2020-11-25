import { ModelDto } from '@/data/protocols'
import { BuildingModel } from '@/data/models'

export interface AddBuildingRepository {
  addBuilding: (buildingDto: ModelDto<BuildingModel>) => Promise<BuildingModel>
}