import { AuthDto } from '@/domain/protocols'
import { Schema } from '../protocols'
import { isString, required } from '../validations'

export const authSchema: Schema<AuthDto> = {
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
  }
}