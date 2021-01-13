import { Building, Company } from '@/domain/entities'

export interface GetCompanyBuildingsUseCase {
  call: (id: Company['id']) => Promise<Building[]>
}
