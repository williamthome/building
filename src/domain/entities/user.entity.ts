import { Entity, Schema } from '../core/entities.core'

export interface UserEntity extends Entity {
  name: string
  address?: string
}

const userSchema: Schema<UserEntity> = {
  name: {
    kind: String,
    required: true,
    unique: false
  },
  address: {
    kind: String,
    required: false,
    unique: false
  }
}