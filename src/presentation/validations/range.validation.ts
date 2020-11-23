import { makeValidationResult } from '../helpers/validation.helper'
import { Validation, ValidationResult } from '../protocols'

class RangeValidation implements Validation {
  private _min = Number.MIN_VALUE
  private _max = Number.MAX_VALUE
  private _customErrorMessage: string | undefined = undefined

  min = (value: number): RangeValidation => {
    this._min = value
    return this
  }

  max = (value: number): RangeValidation => {
    this._max = value
    return this
  }

  message = (message: string | undefined): RangeValidation => {
    this._customErrorMessage = message
    return this
  }

  validate = <T extends Record<string, unknown>> (
    obj: T,
    field: keyof T,
    validations?: Validation[]
  ): ValidationResult => {
    const valid = field in obj &&
      typeof obj[field] === 'number' &&
      (obj[field] as number) >= this._min &&
      (obj[field] as number) <= this._max
    const errorMessage = `Field ${field} must be between ${this._min} and ${this._max}`
    return makeValidationResult(
      valid,
      obj,
      field,
      errorMessage,
      this._customErrorMessage,
      validations
    )
  }
}

export const range = new RangeValidation()