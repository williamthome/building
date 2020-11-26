import { ModelDto } from '@/data/protocols'
import { ProjectModel } from '@/data/models'

export interface AddProjectRepository {
  addProject: (projectDto: ModelDto<ProjectModel>) => Promise<ProjectModel>
}