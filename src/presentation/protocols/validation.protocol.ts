export interface ValidationResult {
  valid: boolean
  errorMessage?: string
  validations?: Validation[]
}

export interface Validation {
  validate: <T extends Record<string, unknown>> (obj: T, field: keyof T, validations?: Validation[], customErrorMessage?: string) => ValidationResult
}

export abstract class BaseValidation<T extends Validation> implements Validation {
  isParam = false
  customErrorMessage: string | undefined = undefined
  abstract readonly validation: () => T

  param = (): T => {
    this.isParam = true
    return this.validation()
  }

  message = (message: string | undefined): T => {
    this.customErrorMessage = message
    return this.validation()
  }

  abstract validate: <T extends Record<string, unknown>> (obj: T, field: keyof T, validations?: Validation[], customErrorMessage?: string) => ValidationResult
}