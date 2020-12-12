import { BuildingData } from '@/data/models'

export interface DeleteBuildingProjectsRepository {
  deleteBuildingProjects: (id: BuildingData['id']) => Promise<number>
}