import { CompanyModel } from '@/data/models'

export interface GetCompanyProjectCountRepository {
  getCompanyProjectCount: (id: CompanyModel['id']) => Promise<number>
}