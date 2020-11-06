import { Validation, ValidationResult } from '../protocols'

export const isString: Validation = {
  validade: <T> (field: string, toValidate: T, errorMessage?: string): ValidationResult => {
    const valid = typeof toValidate === 'string'
    return {
      valid,
      errorMessage: valid ? undefined : errorMessage || `Field ${field} must be string type`
    }
  }
}