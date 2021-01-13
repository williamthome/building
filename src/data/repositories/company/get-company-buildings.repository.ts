import { BuildingData, CompanyData } from '@/data/models'

export interface GetCompanyBuildingsRepository {
  getCompanyBuildings: (id: CompanyData['id']) => Promise<BuildingData[]>
}
