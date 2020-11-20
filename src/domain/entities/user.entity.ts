import { DeepFlattenPaths } from '@/shared/types/flatten'
import { Entity } from '../protocols/entity.protocol'
import { Address, addressKeys } from './nested'

export interface UserEntity extends Entity {
  email: string
  password: string
  accessToken?: string
  name: string
  address?: Address
}

export const userKeys: DeepFlattenPaths<UserEntity> = {
  id: 'id',
  email: 'email',
  password: 'password',
  accessToken: 'accessToken',
  name: 'name',
  address: 'address',
  ...addressKeys
}