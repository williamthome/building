import { ModelDto } from '@/data/protocols'
import { ProjectModel } from '@/data/models'

export interface UpdateProjectRepository {
  updateProject: (
    projectId: ProjectModel['id'],
    projectDto: ModelDto<ProjectModel>
  ) => Promise<ProjectModel | null>
}