import { Entity } from '../protocols/entity.protocol'

export interface UserEntity extends Entity {
  name: string
  address?: string
}