import { EntitySchema } from '../protocols'
import { ProjectEntity } from '@/domain/entities'
import { isNumber, isString, range, required } from '../validations'
import { idParamSchemaOptions } from './params'
import { ProjectStatus } from '@/shared/constants'
import { firstEnumValue, lastEnumValue } from '@/shared/helpers/enum.helper'

export const projectSchema: EntitySchema<Omit<ProjectEntity, 'companyId'>> = {
  buildingId: idParamSchemaOptions,
  phaseId: idParamSchemaOptions,
  title: {
    validations: [
      required,
      isString
    ]
  },
  status: {
    validations: [
      isNumber,
      range.min(firstEnumValue(ProjectStatus)).max(lastEnumValue(ProjectStatus))
    ]
  }
}