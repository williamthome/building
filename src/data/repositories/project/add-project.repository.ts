import { CreateProjectData, ProjectData } from '@/data/models'

export interface AddProjectRepository {
  addProject: (dto: CreateProjectData) => Promise<ProjectData>
}
