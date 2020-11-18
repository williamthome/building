import { DeepFlattenPaths } from '@/shared/types/flatten'
import { Entity } from '../protocols/entity.protocol'
import { Address, addressKeys } from './nested'

export interface UserEntity extends Entity {
  name: string
  password: string
  address?: Address
}

export const userKeys: DeepFlattenPaths<UserEntity> = {
  id: 'id',
  name: 'name',
  password: 'password',
  address: 'address',
  ...addressKeys
}