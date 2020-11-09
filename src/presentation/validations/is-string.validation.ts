import { Validation, ValidationResult } from '../protocols'
import { requiredInValidations } from '../helpers/validation.helper'

export const isString: Validation = {
  validate: <T extends Record<string, unknown>> (
    obj: T,
    field: keyof T,
    validations?: Validation[],
    errorMessage?: string
  ): ValidationResult => {
    const valid = requiredInValidations(validations)
      ? obj && typeof obj[field] === 'string'
      : true
    return {
      valid,
      errorMessage: valid
        ? undefined
        : errorMessage || `Field ${field} must be string type`,
      validations
    }
  }
}