import { Building, CreateBuildingDto, UpdateBuildingDto } from '@/domain/entities'

export type BuildingData = Building

export type CreateBuildingData = CreateBuildingDto & Pick<BuildingData, 'companyId'>

export type UpdateBuildingData = UpdateBuildingDto
