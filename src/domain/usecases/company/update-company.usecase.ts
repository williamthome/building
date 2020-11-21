import { CompanyEntity } from '@/domain/entities'
import { CompanyDto } from '@/domain/protocols'

export interface UpdateCompanyUseCase {
  call: (companyId: CompanyEntity['id'], companyDto: CompanyDto) => Promise<CompanyEntity | null>
}