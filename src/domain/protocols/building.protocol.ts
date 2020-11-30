import { BuildingEntity } from '../entities'
import { EntityDto } from './entity.protocol'

export type BuildingDto = EntityDto<BuildingEntity | Omit<BuildingEntity, 'companyId'>>