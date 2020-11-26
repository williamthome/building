import { ProjectModel } from '@/data/models'

export interface DeleteProjectRepository {
  deleteProject: (projectId: ProjectModel['id']) => Promise<ProjectModel | null>
}