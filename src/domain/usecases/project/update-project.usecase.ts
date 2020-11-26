import { ProjectEntity } from '@/domain/entities'
import { ProjectDto } from '@/domain/protocols'

export interface UpdateProjectUseCase {
  call: (projectId: ProjectEntity['id'], projectDto: ProjectDto) => Promise<ProjectEntity | null>
}