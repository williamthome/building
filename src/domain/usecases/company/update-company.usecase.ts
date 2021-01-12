import { Company, UpdateCompanyDto } from '@/domain/entities'

export interface UpdateCompanyUseCase {
  call: (id: Company['id'], dto: UpdateCompanyDto) => Promise<Company | null>
}
