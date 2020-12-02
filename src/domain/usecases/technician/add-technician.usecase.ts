import { TechnicianEntity, CompanyEntity } from '@/domain/entities'
import { TechnicianEntityDto } from '@/domain/protocols'

export interface AddTechnicianUseCase {
  call: (
    dto: TechnicianEntityDto,
    companyId: CompanyEntity['id']
  ) => Promise<TechnicianEntity>
}