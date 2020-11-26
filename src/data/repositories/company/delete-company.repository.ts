import { CompanyModel } from '@/data/models'

export interface DeleteCompanyRepository {
  deleteCompany: (companyId: CompanyModel['id']) => Promise<CompanyModel | null>
}