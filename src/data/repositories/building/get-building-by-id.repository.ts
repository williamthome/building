import { BuildingData } from '@/data/models'

export interface GetBuildingByIdRepository {
  getBuildingById: (id: BuildingData['id']) => Promise<BuildingData | null>
}
