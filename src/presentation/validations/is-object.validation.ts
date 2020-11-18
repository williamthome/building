import { makeValidationResult } from '../helpers/validation.helper'
import { Validation, ValidationResult } from '../protocols'

export const isObject: Validation = {
  validate: <T extends Record<string, unknown>> (
    obj: T,
    field: keyof T,
    validations?: Validation[],
    customErrorMessage?: string
  ): ValidationResult => {
    const valid = (obj !== null || obj !== undefined) && field in obj && obj[field] === Object(obj[field])
    const errorMessage = `Field ${field} must be object type`
    return makeValidationResult(
      valid,
      obj,
      field,
      errorMessage,
      customErrorMessage,
      validations
    )
  }
}