import { BuildingModel } from '@/data/models'

export interface GetBuildingByIdRepository {
  getBuildingById: (id: BuildingModel['id']) => Promise<BuildingModel | null>
}