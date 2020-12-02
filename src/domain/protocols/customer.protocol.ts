import { CustomerEntity } from '../entities'
import { EntityDto } from './entity.protocol'

export type CustomerEntityDto = EntityDto<CustomerEntity | Omit<CustomerEntity, 'companyId'>>