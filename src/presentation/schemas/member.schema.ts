import { Schema } from '../protocols'
import { isNumber, isString, range, required } from '../validations'
import { MemberEntity } from '@/domain/entities/nested'
import { AllUserFeatures, CompanyRole } from '@/shared/constants'
import { firstEnumValue, lastEnumValue } from '@/shared/helpers/enum.helper'

export const memberSchema: Schema<MemberEntity> = {
  userId: {
    validations: [
      required,
      isString
    ]
  },
  companyRole: {
    validations: [
      required,
      isNumber,
      range.min(firstEnumValue(CompanyRole)).max(lastEnumValue(CompanyRole))
    ]
  },
  features: {
    validations: [
      required,
      isNumber,
      range.min(0).max(AllUserFeatures).message('Invalid user features')
    ]
  }
}