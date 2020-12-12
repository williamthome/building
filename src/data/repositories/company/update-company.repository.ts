import { CompanyData, UpdateCompanyData } from '@/data/models'

export interface UpdateCompanyRepository {
  updateCompany: (id: CompanyData['id'], dto: UpdateCompanyData) => Promise<CompanyData | null>
}