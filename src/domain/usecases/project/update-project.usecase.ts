import { Project, UpdateProjectDto } from '@/domain/entities'

export interface UpdateProjectUseCase {
  call: (id: Project['id'], dto: UpdateProjectDto) => Promise<Project | null>
}
