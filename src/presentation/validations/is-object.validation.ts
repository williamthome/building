import { validationHelper } from '../helpers/validation.helper'
import { BaseValidation, Validation, ValidationResult } from '../protocols'

class IsObjectValidation extends BaseValidation<IsObjectValidation> {
  validation = (): IsObjectValidation => this

  validate = <T extends Record<string, unknown>> (
    obj: T,
    key: keyof T,
    validations?: Validation[]
  ): ValidationResult => {
    const valid = (obj !== null || obj !== undefined) && key in obj && obj[key] === Object(obj[key])
    const errorMessage = `${this.isParam ? 'Param' : 'Field'} ${key} must be object type`
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

export const isObject = new IsObjectValidation()