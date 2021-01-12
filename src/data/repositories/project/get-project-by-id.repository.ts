import { ProjectData } from '@/data/models'

export interface GetProjectByIdRepository {
  getProjectById: (id: ProjectData['id']) => Promise<ProjectData | null>
}
