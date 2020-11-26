import { Entity } from '../protocols/entity.protocol'
import { UserEntity } from './user.entity'

export interface UnverifiedEntity extends Entity {
  userId: UserEntity['id']
  expiresIn: number
}