import { BuildingModel } from '@/data/models'
import { BuildingModelDto } from '@/data/protocols'

export interface AddBuildingRepository {
  addBuilding: (buildingDto: BuildingModelDto) => Promise<BuildingModel>
}