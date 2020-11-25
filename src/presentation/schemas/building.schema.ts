import { EntitySchema } from '../protocols'
import { BuildingEntity } from '@/domain/entities'
import { isString, required } from '../validations'

export const buildingSchema: EntitySchema<Omit<BuildingEntity, 'companyId'>> = {
  title: {
    validations: [
      required,
      isString
    ]
  }
}