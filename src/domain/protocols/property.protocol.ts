import { PropertyEntity } from '../entities'
import { EntityDto } from './entity.protocol'

export type PropertyEntityDto = EntityDto<PropertyEntity | Omit<PropertyEntity, 'companyId'>>