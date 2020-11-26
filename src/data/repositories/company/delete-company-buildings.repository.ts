import { CompanyModel } from '@/data/models'

export interface DeleteCompanyBuildingsRepository {
  deleteCompanyBuildings: (companyId: CompanyModel['id']) => Promise<number>
}