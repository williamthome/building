import { PhaseEntity } from '../entities'
import { EntityDto } from './entity.protocol'

export type PhaseEntityDto = EntityDto<PhaseEntity | Omit<PhaseEntity, 'companyId'>>