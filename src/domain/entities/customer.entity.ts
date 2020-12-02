import { LimitedEntity, LimitedEntityKeys } from '../protocols'

export interface CustomerEntity extends LimitedEntity {
  name: string
}

export const customerKeys: LimitedEntityKeys<CustomerEntity> = {
  id: 'id',
  companyId: 'companyId',
  name: 'name'
}