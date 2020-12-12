import { ProjectData } from '@/data/models'

export interface DeleteProjectRepository {
  deleteProject: (id: ProjectData['id']) => Promise<ProjectData | null>
}