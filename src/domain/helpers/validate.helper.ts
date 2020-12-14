import { BaseSchema } from '../protocols'
import { ObjectSchema } from '../protocols/schema/schemas/object.schema'
import { Validation } from '../protocols/validate'

export const validateSchemas = (schemas: any, obj: any, allKeys: boolean, bannedFields: string[]): void | string => {
  for (const [key, schema] of Object.entries(schemas)) {
    if (!(schema instanceof BaseSchema))
      return 'Invalid schema'

    const nonWritable = schema['isNonWritable']
    const customNonWritableMessage = schema['customNonWritableMessage']

    if ((nonWritable && key in obj) || key in bannedFields)
      return customNonWritableMessage || `${key} is non writable`

    if (!allKeys && !(key in obj))
      continue

    const value = obj[key]
    const defined = isDefined(value)
    const required = schema['isRequired']
    const customRequiredMessage = schema['customRequiredMessage']

    if (required && !defined)
      return customRequiredMessage || `${key} is required`

    for (const validation of schema['validations']) {
      if (!required && !defined)
        continue

      const error = (validation as Validation<any>).validate(obj, key)

      if (error)
        return error
    }

    if (schema instanceof ObjectSchema && defined)
      return validateSchemas(schema['schemas'], value, allKeys, bannedFields)
  }
}

export const isDefined = (value: any): boolean => {
  switch (typeof value) {
    case 'undefined':
      return false
    case 'string':
      return value !== ''
    case 'object':
      return value === Object(value) && Object.entries(value).length > 0
    default:
      return value !== 'undefined'
  }
}