import { BuildingModel } from '@/data/models'

export interface DeleteBuildingPhasesRepository {
  deleteBuildingPhases: (buildingId: BuildingModel['id']) => Promise<number>
}