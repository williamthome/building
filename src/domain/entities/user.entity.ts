import { Entity, EntityKeys } from '../protocols/entity.protocol'
import { CompanyEntity } from './company.entity'
import { AddressEntity, addressKeys } from './nested'

export interface UserEntity extends Entity {
  email: string
  password: string
  verified: boolean
  accessToken?: string
  name: string
  address?: AddressEntity
  activeCompanyId?: CompanyEntity['id']
}

export const userKeys: EntityKeys<UserEntity> = {
  id: 'id',
  email: 'email',
  password: 'password',
  verified: 'verified',
  accessToken: 'accessToken',
  name: 'name',
  address: 'address',
  activeCompanyId: 'activeCompanyId',
  ...addressKeys
}