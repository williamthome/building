import { makeValidationResult } from '../helpers/validation.helper'
import { Validation, ValidationResult } from '../protocols'

export const isString: Validation = {
  validate: <T extends Record<string, unknown>> (
    obj: T,
    field: keyof T,
    validations?: Validation[],
    customErrorMessage?: string
  ): ValidationResult => {
    const valid = field in obj && typeof obj[field] === 'string' && obj[field] !== ''
    const errorMessage = `Field ${field} must be string type`
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