import { EntitySchema } from '../protocols'
import { isObject, isString, required } from '../validations'
import { UserEntity } from '@/domain/entities'

export const userSchema: EntitySchema<UserEntity> = {
  email: {
    validations: [
      required,
      isString
    ]
  },
  password: {
    validations: [
      required,
      isString
    ]
  },
  name: {
    validations: [
      required,
      isString
    ]
  },
  address: {
    validations: [
      isObject
    ],
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