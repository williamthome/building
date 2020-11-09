import { badRequest } from '../factories/http.factory'
import { HttpResponse, Schema, SchemaOptions, Validation } from '../protocols'
import { isNestedSchema } from './schema.helper'
import { required } from '../validations'

export const schemaError = <T extends Record<PropertyKey, any>> (
  obj: Partial<T>,
  schema: Schema<T>
): HttpResponse<Error> | undefined => {
  for (const [field, value] of Object.entries(schema)) {
    const fieldSchema = isNestedSchema(value) ? value : value as SchemaOptions

    for (const validation of fieldSchema.validations) {
      const { valid, errorMessage } = validation.validate(obj, field, fieldSchema.validations)
      if (!valid)
        return badRequest(new Error(errorMessage))
    }

    if (isNestedSchema(fieldSchema)) {
      const nestedObj = obj[field]
      if (!nestedObj && !requiredInValidations(fieldSchema.validations)) continue

      const nestedError = schemaError(nestedObj as any, fieldSchema.nested)
      if (nestedError) return nestedError
    }
  }
  return undefined
}

export const requiredInValidations = (
  validations?: Validation[]
): boolean => validations ? validations.some(v => v === required) : false