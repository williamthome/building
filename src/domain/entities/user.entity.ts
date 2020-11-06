import { Entity } from '../protocols/entity.protocol'
import { Address } from './nested'

export interface UserEntity extends Entity {
  name: string
  address?: Address
}