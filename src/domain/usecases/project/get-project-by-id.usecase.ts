import { ProjectEntity } from '@/domain/entities'

export interface GetProjectByIdUseCase {
  call: (id: ProjectEntity['id']) => Promise<ProjectEntity | null>
}