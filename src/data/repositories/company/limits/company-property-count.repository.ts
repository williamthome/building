import { CompanyModel } from '@/data/models'

export interface GetCompanyPropertyCountRepository {
  getCompanyPropertyCount: (id: CompanyModel['id']) => Promise<number>
}