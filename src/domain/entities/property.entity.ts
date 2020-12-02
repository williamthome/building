import { DeepFlattenPaths } from '@/shared/types'
import { CompanyEntity } from '.'
import { Entity } from '../protocols'
import { AddressEntity, addressKeys } from './nested'

export interface PropertyEntity extends Entity {
  companyId: CompanyEntity['id']
  address?: AddressEntity
}

export const propertyKeys: DeepFlattenPaths<PropertyEntity> = {
  id: 'id',
  companyId: 'companyId',
  address: 'address',
  ...addressKeys
}