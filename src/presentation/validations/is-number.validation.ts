import { makeValidationResult } from '../helpers/validation.helper'
import { Validation, ValidationResult } from '../protocols'

export const isNumber: Validation = {
  validate: <T extends Record<string, unknown>> (
    obj: T,
    field: keyof T,
    validations?: Validation[],
    customErrorMessage?: string
  ): ValidationResult => {
    const valid = field in obj && typeof obj[field] === 'number'
    const errorMessage = `Field ${field} must be number type`
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