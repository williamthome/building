export interface ValidationResult {
  valid: boolean
  errorMessage?: string
}

export interface Validation {
  validade: <T> (field: string, toValidade: T, errorMessage?: string) => ValidationResult
}