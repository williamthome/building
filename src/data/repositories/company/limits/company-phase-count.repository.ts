import { CompanyModel } from '@/data/models'

export interface GetCompanyPhaseCountRepository {
  getCompanyPhaseCount: (id: CompanyModel['id']) => Promise<number>
}