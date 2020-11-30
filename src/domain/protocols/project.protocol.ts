import { ProjectEntity } from '../entities'
import { EntityDto } from './entity.protocol'

export type ProjectEntityDto = EntityDto<ProjectEntity | Omit<ProjectEntity, 'companyId'>>