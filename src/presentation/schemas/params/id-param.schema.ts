import { Entity } from '@/domain/protocols'
import { Schema } from '@/presentation/protocols'
import { isString, required } from '@/presentation/validations'
import { DeepFlattenPaths } from '@/shared/types'

export const idParamSchema: Schema<Entity> = {
  id: {
    validations: [
      required,
      isString
    ]
  }
}

export const idParamKeys: DeepFlattenPaths<Entity> = {
  id: 'id'
}