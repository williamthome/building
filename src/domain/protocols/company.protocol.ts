import { EntityDto } from './entity.protocol'
import { CompanyEntity } from '../entities'

export type CompanyDto = EntityDto<CompanyEntity>

export type CompanyEntityMembers = Pick<CompanyEntity, 'id' | 'members'>