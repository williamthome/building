import { CompanyModelDto } from '@/data/protocols'
import { CompanyModel } from '@/data/models'

export interface AddCompanyRepository {
  addCompany: (companyDto: CompanyModelDto) => Promise<CompanyModel>
}