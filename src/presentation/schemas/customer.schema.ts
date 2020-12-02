import { EntitySchema } from '../protocols'
import { CustomerEntity } from '@/domain/entities'
import { isString, required } from '../validations'

export const customerSchema: EntitySchema<Omit<CustomerEntity, 'companyId'>> = {
  name: {
    validations: [
      required,
      isString
    ]
  }
}