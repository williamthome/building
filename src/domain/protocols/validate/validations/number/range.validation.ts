import { Validate, ValidateOptions } from '../../validate.protocol'

class RangeValidation<T> extends Validate<T, RangeValidation<T>> {
  validation = (): RangeValidation<T> => this

  constructor(
    private readonly min: number,
    private readonly max: number,
    opts: ValidateOptions | undefined
  ) {
    super(opts)
  }

  validate = (obj: T, key: keyof T): string | void => {
    const value = obj[key]
    const valid = typeof value === 'number' && value >= this.min && value <= this.max
    if (valid) return
    return this.opts?.customMessage || `${key} must be between ${this.min} and ${this.max}`
  }
}

export const range = <T>(min: number, max: number, opts?: ValidateOptions): RangeValidation<T> =>
  new RangeValidation<T>(min, max, opts)
