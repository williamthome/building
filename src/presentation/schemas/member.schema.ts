import { Schema } from '../protocols'
import { isNumber, isString, required } from '../validations'
import { Member } from '@/domain/entities/nested'

export const memberSchema: Schema<Member> = {
  userId: {
    validations: [
      required,
      isString
    ]
  },
  companyRole: {
    validations: [
      required,
      isNumber
    ]
  },
  features: {
    validations: [
      required,
      isNumber
    ]
  }
}