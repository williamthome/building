import { Technician, Company, CreateTechnicianDto } from '@/domain/entities'

export interface AddTechnicianUseCase {
  call: (dto: CreateTechnicianDto, companyId: Company['id']) => Promise<Technician>
}
