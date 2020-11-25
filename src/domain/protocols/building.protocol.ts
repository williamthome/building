import { BuildingEntity } from '../entities'

export type BuildingDto = Partial<Omit<BuildingEntity, 'id' | 'companyId'>>