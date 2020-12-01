import { ProjectModel } from '@/data/models'

export interface GetProjectByIdRepository {
  getProjectById: (id: ProjectModel['id']) => Promise<ProjectModel | null>
}