export interface ValidationResult {
  valid: boolean
  errorMessage?: string
  validations?: Validation[]
}

export interface Validation {
  validate: <T extends Record<string, unknown>> (obj: T, field: keyof T, validations?: Validation[], customErrorMessage?: string) => ValidationResult
}