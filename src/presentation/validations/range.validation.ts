import { makeValidationResult } from '../helpers/validation.helper'
import { BaseValidation, Validation, ValidationResult } from '../protocols'

class RangeValidation extends BaseValidation<RangeValidation> {
  validation = (): RangeValidation => this

  private _max = Number.MAX_VALUE
  private _min = Number.MIN_VALUE

  min = (value: number): RangeValidation => {
    this._min = value
    return this
  }

  max = (value: number): RangeValidation => {
    this._max = value
    return this
  }

  validate = <T extends Record<string, unknown>> (
    obj: T,
    key: keyof T,
    validations?: Validation[]
  ): ValidationResult => {
    const valid = key in obj &&
      typeof obj[key] === 'number' &&
      (obj[key] as number) >= this._min &&
      (obj[key] as number) <= this._max
    const errorMessage = `${this.isParam ? 'Param' : 'Field'} ${key} must be between ${this._min} and ${this._max}`
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

export const range = new RangeValidation()