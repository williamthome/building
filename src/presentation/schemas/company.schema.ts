import { EntitySchema } from '../protocols'
import { CompanyEntity } from '@/domain/entities'
import { isString, required } from '../validations'

export const companySchema: EntitySchema<CompanyEntity> = {
  name: {
    validations: [
      required,
      isString
    ]
  },
  members: {
    validations: []
  }
}