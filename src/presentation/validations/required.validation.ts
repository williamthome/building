import { Validation, ValidationResult } from '@/presentation/protocols/validation.protocol'

export const required: Validation = {
  validate: <T extends Record<string, unknown>> (
    obj: T,
    field: keyof T,
    validations?: Validation[],
    errorMessage?: string
  ): ValidationResult => {
    const valid = obj && typeof obj[field] !== 'undefined'
    return {
      valid,
      errorMessage: valid
        ? undefined :
        errorMessage || `Field ${field} is required`,
      validations
    }
  }
}