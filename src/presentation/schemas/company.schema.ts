import { EntitySchema } from '../protocols'
import { CompanyEntity } from '@/domain/entities'
import { isString, required } from '../validations'
import { idParamSchemaOptions } from './params'

export const companySchema: EntitySchema<CompanyEntity> = {
  planId: idParamSchemaOptions,
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