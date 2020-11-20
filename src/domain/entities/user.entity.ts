import { DeepFlattenPaths } from '@/shared/types/flatten'
import { Entity } from '../protocols/entity.protocol'
import { CompanyEntity } from './company.entity'
import { Address, addressKeys } from './nested'

export interface UserEntity extends Entity {
  email: Entity['id']
  password: string
  accessToken?: string
  name: string
  address?: Address
  activeCompanyId?: CompanyEntity['id']
}

export const userKeys: DeepFlattenPaths<UserEntity> = {
  id: 'id',
  email: 'email',
  password: 'password',
  accessToken: 'accessToken',
  name: 'name',
  address: 'address',
  activeCompanyId: 'activeCompanyId',
  ...addressKeys
}