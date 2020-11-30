import { ProjectModelDto } from '@/data/protocols'
import { ProjectModel } from '@/data/models'

export interface AddProjectRepository {
  addProject: (projectDto: ProjectModelDto) => Promise<ProjectModel>
}