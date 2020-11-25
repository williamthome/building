import { BuildingEntity, CompanyEntity } from '@/domain/entities'
import { BuildingDto } from '@/domain/protocols'

export interface AddBuildingUseCase {
  call: (buildingDto: BuildingDto, companyId: CompanyEntity['id']) => Promise<BuildingEntity>
}