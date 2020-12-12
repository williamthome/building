import { CompanyData } from '@/data/models'

export interface DeleteCompanyRepository {
  deleteCompany: (id: CompanyData['id']) => Promise<CompanyData | null>
}