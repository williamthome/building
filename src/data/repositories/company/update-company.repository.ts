import { CompanyModelDto } from '@/data/protocols'
import { CompanyModel } from '@/data/models'

export interface UpdateCompanyRepository {
  updateCompany: (
    companyId: CompanyModel['id'],
    companyDto: CompanyModelDto
  ) => Promise<CompanyModel | null>
}