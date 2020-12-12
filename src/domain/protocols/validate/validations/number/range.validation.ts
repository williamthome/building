import { Validate, ValidateOptions } from '../../validate.protocol'

class RangeValidation extends Validate<RangeValidation> {
  validation = (): RangeValidation => this

  constructor (
    private readonly min: number,
    private readonly max: number,
    opts: ValidateOptions | undefined
  ) {
    super(opts)
  }

  validate = (key: string, value: any): string | void => {
    const valid = typeof value === 'number' && value >= this.min && value <= this.max
    if (valid) return
    return this.opts?.customMessage || `${key} must be between ${this.min} and ${this.max}`
  }
}

export const range = (
  min: number,
  max: number,
  opts?: ValidateOptions
): RangeValidation => new RangeValidation(min, max, opts)