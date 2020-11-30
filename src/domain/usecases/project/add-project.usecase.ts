import { ProjectEntity, CompanyEntity } from '@/domain/entities'
import { ProjectEntityDto } from '@/domain/protocols'

export interface AddProjectUseCase {
  call: (
    projectDto: ProjectEntityDto,
    companyId: CompanyEntity['id']
  ) => Promise<ProjectEntity>
}