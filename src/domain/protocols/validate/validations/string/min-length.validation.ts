import { Validate, ValidateOptions } from '../../validate.protocol'

class MinLengthValidation<T> extends Validate<T, MinLengthValidation<T>> {
  validation = (): MinLengthValidation<T> => this

  constructor (
    private readonly minLength: number,
    opts: ValidateOptions | undefined
  ) {
    super(opts)
  }

  validate = (obj: T, key: keyof T): string | void => {
    const value = obj[key]
    const valid = typeof value === 'string' && value.length >= this.minLength
    if (valid) return
    return this.opts?.customMessage || `${key} must be at least ${this.minLength} character(s)`
  }
}

export const minLength = <T> (
  minLength: number,
  opts?: ValidateOptions
): MinLengthValidation<T> => new MinLengthValidation<T>(minLength, opts)