import { makeValidationResult } from '../helpers/validation.helper'
import { BaseValidation, Validation, ValidationResult } from '../protocols'

class MinLengthValidation extends BaseValidation<MinLengthValidation> {
  validation = (): MinLengthValidation => this

  constructor (private readonly minLength: number) { super() }

  validate = <T extends Record<string, unknown>> (
    obj: T,
    key: keyof T,
    validations?: Validation[]
  ): ValidationResult => {
    const valid = key in obj && typeof obj[key] === 'string' && (obj[key] as string).length >= this.minLength
    const errorMessage = `${this.isParam ? 'Param' : 'Field'} ${key} must be at least ${this.minLength} characters`
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

export const minLength = (minLength: number): MinLengthValidation => new MinLengthValidation(minLength)