import { CompanyModel } from '@/data/models'

export interface GetCompanyByIdRepository {
  getCompanyById: (id: CompanyModel['id']) => Promise<CompanyModel | null>
}