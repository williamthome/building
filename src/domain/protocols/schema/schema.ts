import { ValidateSchemaOptions } from './schema.protocol'
import { validateSchemas, isDefined } from '../../helpers/validate.helper'

export class Schema<TSchemas> {
  constructor (protected readonly schemas: TSchemas) { }

  validate = <T> (
    obj: any,
    opts?: ValidateSchemaOptions<T>
  ): void | string => {
    const allKeys = opts?.allKeys ?? true
    const mustBeTruthy = opts?.mustBeTruthy ?? true
    const messageIfNotTruthy = opts?.customMessageIfNotTruthy ?? 'Object must be truthy'
    const bannedFields = opts?.bannedFields ?? []

    if (mustBeTruthy && !isDefined(obj))
      return messageIfNotTruthy

    return validateSchemas(
      this.schemas,
      obj,
      allKeys,
      bannedFields
    )
  }
}