import { badRequest } from '../factories/http.factory'
import { HttpResponse, Schema, SchemaOptions, Validation } from '../protocols'
import { isNestedSchema } from './schema.helper'
import { required } from '../validations'
import { DeepFlattenPaths } from '@/shared/types'

export const schemaError = <T extends Record<PropertyKey, any>> (
  obj: Partial<T>,
  schema: Schema<T>,
  nullable: boolean,
  keys?: DeepFlattenPaths<T>
): HttpResponse<Error> | undefined => {
  if (keys) deleteInexistentFields(obj, keys)

  for (const [field, value] of Object.entries(schema)) {
    if (nullable && !(field in obj)) continue

    const fieldSchema = isNestedSchema(value) ? value : value as SchemaOptions

    const error = validationsError(obj, field, fieldSchema.validations)
    if (error)
      return error

    if (isNestedSchema(fieldSchema)) {
      const nestedObj = obj[field]
      if (!nestedObj && !requiredInValidations(fieldSchema.validations))
        continue

      const nestedError = schemaError(nestedObj as any, fieldSchema.nested, nullable, keys as any)
      if (nestedError)
        return nestedError
    }
  }
  return undefined
}

const deleteInexistentFields = <T extends Record<PropertyKey, any>> (
  obj: Partial<T>,
  keys: DeepFlattenPaths<T>
): void => {
  const objectKeys = Object.keys(obj) as string[]
  const schemaKeys = Object.values(keys) as string[]
  objectKeys.forEach(k => {
    if (!schemaKeys.includes(k))
      delete obj[k]
  })
}

const validationsError = <T extends Record<PropertyKey, any>> (
  obj: T,
  field: keyof T,
  validations: Validation[]
): HttpResponse<Error> | undefined => {
  for (const validation of validations) {
    const { valid, errorMessage } = validation.validate(obj, field, validations)
    if (!valid)
      return badRequest(new Error(errorMessage))
  }
  return undefined
}

export const requiredInValidations = (
  validations?: Validation[]
): boolean => validations ? validations.some(v => v === required) : false