import { Entity } from '@/domain/protocols'
import { Schema, SchemaOptions } from '@/presentation/protocols'
import { isString, required } from '@/presentation/validations'
import { DeepFlattenPaths } from '@/shared/types'

export const idParamSchemaOptions: SchemaOptions = {
  validations: [
    required.param(),
    isString.param()
  ]
}

export const idParamSchema: Schema<Entity> = {
  id: idParamSchemaOptions
}

export const idParamKeys: DeepFlattenPaths<Entity> = {
  id: 'id'
}