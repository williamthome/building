import { BaseValidation, Validation, ValidationResult } from '../protocols'

class RequiredValidation extends BaseValidation<RequiredValidation> {
  validation = (): RequiredValidation => this

  validate = <T extends Record<string, unknown>> (
    obj: T,
    key: keyof T,
    validations?: Validation[]
  ): ValidationResult => {
    const value = obj[key]
    let valid = key in obj
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
        this.customErrorMessage || `${this.isParam ? 'Param' : 'Field'} ${key} is required`,
      validations
    }
  }
}

export const required = new RequiredValidation()