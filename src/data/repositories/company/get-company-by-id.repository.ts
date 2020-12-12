import { CompanyData } from '@/data/models'

export interface GetCompanyByIdRepository {
  getCompanyById: (id: CompanyData['id']) => Promise<CompanyData | null>
}