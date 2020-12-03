import { validationHelper } from '../helpers/validation.helper'
import { BaseValidation, Validation, ValidationResult } from '../protocols'

class IsBooleanValidation extends BaseValidation<IsBooleanValidation> {
  validation = (): IsBooleanValidation => this

  validate = <T extends Record<string, unknown>> (
    obj: T,
    key: keyof T,
    validations?: Validation[]
  ): ValidationResult => {
    const valid = key in obj && typeof obj[key] === 'boolean'
    const errorMessage = `${this.isParam ? 'Param' : 'Field'} ${key} must be boolean type`
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

export const isBoolean = new IsBooleanValidation()