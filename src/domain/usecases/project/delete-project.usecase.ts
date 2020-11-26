import { ProjectEntity } from '@/domain/entities'

export interface DeleteProjectUseCase {
  call: (projectId: ProjectEntity['id']) => Promise<ProjectEntity | null>
}