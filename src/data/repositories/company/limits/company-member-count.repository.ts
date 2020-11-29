import { CompanyModel } from '@/data/models'

export interface GetCompanyMemberCountRepository {
  getCompanyMemberCount: (id: CompanyModel['id']) => Promise<number>
}