import { ProjectData, UpdateProjectData } from '@/data/models'

export interface UpdateProjectRepository {
  updateProject: (id: ProjectData['id'], dto: UpdateProjectData) => Promise<ProjectData | null>
}
