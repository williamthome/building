import { CompanyData } from '@/data/models'

export interface DeleteCompanyBuildingsRepository {
  deleteCompanyBuildings: (id: CompanyData['id']) => Promise<number>
}
