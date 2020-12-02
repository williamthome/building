import { TechnicianEntity } from '../entities'
import { EntityDto } from './entity.protocol'

export type TechnicianEntityDto = EntityDto<TechnicianEntity | Omit<TechnicianEntity, 'companyId'>>