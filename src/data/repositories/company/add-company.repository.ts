import { ModelDto } from '@/data/protocols'
import { CompanyModel } from '@/data/models'

export interface AddCompanyRepository {
  addCompany: (companyDto: ModelDto<CompanyModel>) => Promise<CompanyModel>
}