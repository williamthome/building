import { Schema } from '../protocols'
import { isEmail, isObject, isString, minLength, required } from '../validations'
import { UserDto } from '@/domain/protocols'

export const userSchema: Schema<Required<UserDto>> = {
  email: {
    validations: [
      required,
      isString,
      isEmail
    ]
  },
  password: {
    validations: [
      required,
      isString,
      minLength(6)
    ]
  },
  accessToken: {
    validations: []
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
  },
  activeCompanyId: {
    validations: [
      isString
    ]
  }
}