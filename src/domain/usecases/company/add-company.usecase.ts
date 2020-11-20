import { CompanyEntity } from '@/domain/entities'
import { CompanyDto } from '@/domain/protocols'

export interface AddCompanyUseCase {
  call: (companyDto: CompanyDto) => Promise<CompanyEntity>
}