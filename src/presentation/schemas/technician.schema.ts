import { EntitySchema } from '../protocols'
import { TechnicianEntity } from '@/domain/entities'
import { isString, required } from '../validations'

export const technicianSchema: EntitySchema<Omit<TechnicianEntity, 'companyId'>> = {
  name: {
    validations: [
      required,
      isString
    ]
  },
  technicalRegisters: {
    validations: []
  }
}