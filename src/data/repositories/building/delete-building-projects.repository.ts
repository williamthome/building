import { BuildingModel } from '@/data/models'

export interface DeleteBuildingProjectsRepository {
  deleteBuildingProjects: (buildingId: BuildingModel['id']) => Promise<number>
}