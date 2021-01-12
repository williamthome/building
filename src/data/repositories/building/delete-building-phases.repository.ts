import { BuildingData } from '@/data/models'

export interface DeleteBuildingPhasesRepository {
  deleteBuildingPhases: (id: BuildingData['id']) => Promise<number>
}
