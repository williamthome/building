import { ProjectModelDto } from '@/data/protocols'
import { ProjectModel } from '@/data/models'

export interface UpdateProjectRepository {
  updateProject: (
    projectId: ProjectModel['id'],
    projectDto: ProjectModelDto
  ) => Promise<ProjectModel | null>
}