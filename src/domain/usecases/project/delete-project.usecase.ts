import { Project } from '@/domain/entities'

export interface DeleteProjectUseCase {
  call: (id: Project['id']) => Promise<Project | null>
}