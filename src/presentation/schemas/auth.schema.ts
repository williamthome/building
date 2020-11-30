import { AuthEntityDto } from '@/domain/protocols'
import { Schema } from '../protocols'
import { isString, required } from '../validations'

export const authSchema: Schema<AuthEntityDto> = {
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