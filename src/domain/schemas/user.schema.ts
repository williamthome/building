import { Schema } from '../protocols'
import { UserEntity } from '../entities'

export const userSchema: Schema<UserEntity> = {
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