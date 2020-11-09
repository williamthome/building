import { NestedSchemaOptions } from '../protocols'

export const isNestedSchema = <T extends Record<PropertyKey, any>> (
  obj: any
): obj is NestedSchemaOptions<T, PropertyKey> => {
  return obj &&
    typeof obj === 'object' &&
    'validations' in obj &&
    Array.isArray(obj.validations) &&
    'nested' in obj
}