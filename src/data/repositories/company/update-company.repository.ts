import { ModelDto } from '@/data/protocols'
import { CompanyModel } from '@/data/models'

export interface UpdateCompanyRepository {
  updateCompany: (
    companyId: CompanyModel['id'],
    companyDto: ModelDto<CompanyModel>
  ) => Promise<CompanyModel | null>
}