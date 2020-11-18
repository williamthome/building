import { makeValidationResult } from '../helpers/validation.helper'
import { Validation, ValidationResult } from '../protocols'

export const minLength = (minLength: number): Validation => ({
  validate: <T extends Record<string, unknown>> (
    obj: T,
    field: keyof T,
    validations?: Validation[],
    customErrorMessage?: string
  ): ValidationResult => {
    const valid = field in obj && typeof obj[field] === 'string' && (obj[field] as string).length >= minLength
    const errorMessage = `Field ${field} must be at least ${minLength} characters`
    return makeValidationResult(
      valid,
      obj,
      field,
      errorMessage,
      customErrorMessage,
      validations
    )
  }
})