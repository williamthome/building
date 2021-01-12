import { CompanyData, CreateCompanyData } from '@/data/models'

export interface AddCompanyRepository {
  addCompany: (dto: CreateCompanyData) => Promise<CompanyData>
}
