import { ProjectEntity, CompanyEntity } from '@/domain/entities'
import { ProjectDto } from '@/domain/protocols'

export interface AddProjectUseCase {
  call: (
    projectDto: ProjectDto,
    companyId: CompanyEntity['id']
  ) => Promise<ProjectEntity>
}