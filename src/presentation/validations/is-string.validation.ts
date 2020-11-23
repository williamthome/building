import { makeValidationResult } from '../helpers/validation.helper'
import { BaseValidation, Validation, ValidationResult } from '../protocols'

class IsStringValidation extends BaseValidation<IsStringValidation> {
  validation = (): IsStringValidation => this

  validate = <T extends Record<string, unknown>> (
    obj: T,
    key: keyof T,
    validations?: Validation[]
  ): ValidationResult => {
    const valid = key in obj && typeof obj[key] === 'string' && obj[key] !== ''
    const errorMessage = `${this.isParam ? 'Param' : 'Field'} ${key} must be string type`
    return makeValidationResult(
      valid,
      obj,
      key,
      errorMessage,
      this.customErrorMessage,
      validations
    )
  }
}

export const isString = new IsStringValidation()