import { EntitySchema } from '../protocols'
import { isString, required } from '../validations'
import { UserEntity } from '@/domain/entities'

export const userSchema: EntitySchema<UserEntity> = {
  name: {
    validations: [
      required,
      isString
    ]
  },
  address: {
    validations: [],
    nested: {
      street: {
        validations: [
          isString
        ]
      },
      city: {
        validations: [
          required,
          isString
        ]
      },
      state: {
        validations: [
          isString
        ]
      }
    }
  }
}