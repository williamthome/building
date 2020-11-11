import { Validation, ValidationResult } from '../protocols'

export const isObject: Validation = {
  validate: <T extends Record<string, unknown>> (
    obj: T,
    field: keyof T,
    validations?: Validation[],
    errorMessage?: string
  ): ValidationResult => {
    const valid = (obj !== null || obj !== undefined) && field in obj && obj[field] === Object(obj[field])
    return {
      valid,
      errorMessage: valid
        ? undefined
        : errorMessage || `Field ${field} must be object type`,
      validations
    }
  }
}