import { Project } from '@/domain/entities'

export interface GetProjectByIdUseCase {
  call: (id: Project['id']) => Promise<Project | null>
}
