import { Validation, ValidationResult } from '@/presentation/protocols/validation.protocol'

export const required: Validation = {
  validate: <T extends Record<string, unknown>> (
    obj: T,
    field: keyof T,
    validations?: Validation[],
    errorMessage?: string
  ): ValidationResult => {
    const value = obj[field]
    let valid = field in obj
    if (valid) {
      switch (typeof value) {
        case 'string':
          valid = value !== ''
          break
        case 'object':
          valid = value === Object(value)
          break
        default:
          valid = value !== 'undefined'
      }
    }
    return {
      valid,
      errorMessage: valid
        ? undefined :
        errorMessage || `Field ${field} is required`,
      validations
    }
  }
}