import { EntitySchema } from '../protocols'
import { ProjectEntity } from '@/domain/entities'
import { isString, required } from '../validations'
import { idParamSchemaOptions } from './params'

export const projectSchema: EntitySchema<Omit<ProjectEntity, 'companyId'>> = {
  buildingId: idParamSchemaOptions,
  phaseId: idParamSchemaOptions,
  title: {
    validations: [
      required,
      isString
    ]
  }
}