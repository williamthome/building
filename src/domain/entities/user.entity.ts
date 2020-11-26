import { DeepFlattenPaths } from '@/shared/types/flatten'
import { Entity } from '../protocols/entity.protocol'
import { CompanyEntity } from './company.entity'
import { Address, addressKeys } from './nested'

export interface UserEntity extends Entity {
  email: string
  password: string
  verified: boolean
  accessToken?: string
  name: string
  address?: Address
  activeCompanyId?: CompanyEntity['id']
}

export const userKeys: DeepFlattenPaths<UserEntity> = {
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