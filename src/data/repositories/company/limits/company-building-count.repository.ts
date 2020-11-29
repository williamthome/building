import { CompanyModel } from '@/data/models'

export interface GetCompanyBuildingCountRepository {
  getCompanyBuildingCount: (id: CompanyModel['id']) => Promise<number>
}