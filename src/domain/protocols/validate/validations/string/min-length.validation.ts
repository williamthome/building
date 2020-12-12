import { Validate, ValidateOptions } from '../../validate.protocol'

class MinLengthValidation extends Validate<MinLengthValidation> {
  validation = (): MinLengthValidation => this

  constructor (
    private readonly minLength: number,
    opts: ValidateOptions | undefined
  ) {
    super(opts)
  }

  validate = (key: string, value: any): string | void => {
    const valid = typeof value === 'string' && value.length >= this.minLength
    if (valid) return
    return this.opts?.customMessage || `${key} must be at least ${this.minLength} character(s)`
  }
}

export const minLength = (
  minLength: number,
  opts?: ValidateOptions
): MinLengthValidation => new MinLengthValidation(minLength, opts)