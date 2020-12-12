import { Building, CreateBuildingDto, Company } from '@/domain/entities'

export interface AddBuildingUseCase {
  call: (dto: CreateBuildingDto, companyId: Company['id']) => Promise<Building>
}