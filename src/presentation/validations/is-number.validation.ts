import { validationHelper } from '../helpers/validation.helper'
import { BaseValidation, Validation, ValidationResult } from '../protocols'

class IsNumberValidation extends BaseValidation<IsNumberValidation> {
  validation = (): IsNumberValidation => this

  validate = <T extends Record<string, unknown>> (
    obj: T,
    key: keyof T,
    validations?: Validation[]
  ): ValidationResult => {
    const valid = key in obj && typeof obj[key] === 'number'
    const errorMessage = `${this.isParam ? 'Param' : 'Field'} ${key} must be number type`
    return validationHelper.makeValidationResult(
      valid,
      obj,
      key,
      errorMessage,
      this.customErrorMessage,
      validations
    )
  }
}

export const isNumber = new IsNumberValidation()