import { requiredInValidations } from '../helpers/validation.helper'
import { Validation, ValidationResult } from '../protocols'

export const isString: Validation = {
  validate: <T extends Record<string, unknown>> (
    obj: T,
    field: keyof T,
    validations?: Validation[],
    errorMessage?: string
  ): ValidationResult => {
    let valid = field in obj && typeof obj[field] === 'string' && obj[field] !== ''
    if (!valid && !requiredInValidations(validations) && !(field in obj)) {
      valid = true
    }
    return {
      valid,
      errorMessage: valid
        ? undefined
        : errorMessage || `Field ${field} must be string type`,
      validations
    }
  }
}