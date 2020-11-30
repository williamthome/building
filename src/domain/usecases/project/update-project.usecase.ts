import { ProjectEntity } from '@/domain/entities'
import { ProjectEntityDto } from '@/domain/protocols'

export interface UpdateProjectUseCase {
  call: (projectId: ProjectEntity['id'], projectDto: ProjectEntityDto) => Promise<ProjectEntity | null>
}