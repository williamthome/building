import { Validation, ValidationResult } from '../protocols/validation.protocol'

export const required: Validation = {
  validade: <T> (field: string, toValidate: T, errorMessage?: string): ValidationResult => {
    const valid = typeof toValidate !== 'undefined'
    return {
      valid,
      errorMessage: valid ? undefined : errorMessage || `Field ${field} is required`
    }
  }
}