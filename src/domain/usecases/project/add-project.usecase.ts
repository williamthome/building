import { Project, Company, CreateProjectDto } from '@/domain/entities'

export interface AddProjectUseCase {
  call: (dto: CreateProjectDto, companyId: Company['id']) => Promise<Project>
}