import { EntitySchema } from '../protocols'
import { PropertyEntity } from '@/domain/entities'
import { isObject, isString, required } from '../validations'

export const propertySchema: EntitySchema<Omit<PropertyEntity, 'companyId'>> = {
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