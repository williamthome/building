import { LimitedEntity, LimitedEntityKeys } from '../protocols'
import { AddressEntity, addressKeys } from './nested'

export interface PropertyEntity extends LimitedEntity {
  address?: AddressEntity
}

export const propertyKeys: LimitedEntityKeys<PropertyEntity> = {
  id: 'id',
  companyId: 'companyId',
  address: 'address',
  ...addressKeys
}