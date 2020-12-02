import { EntitySchema } from '../protocols'
import { PhaseEntity } from '@/domain/entities'
import { isString, required } from '../validations'
import { idParamSchemaOptions } from './params'

export const phaseSchema: EntitySchema<Omit<PhaseEntity, 'companyId'>> = {
  buildingId: idParamSchemaOptions,
  title: {
    validations: [
      required,
      isString
    ]
  }
}