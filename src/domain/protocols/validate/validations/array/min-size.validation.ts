import { Validate, ValidateOptions } from '../../validate.protocol'

class MinSizeValidation<T> extends Validate<T, MinSizeValidation<T>> {
  validation = (): MinSizeValidation<T> => this

  constructor (
    private readonly minSize: number,
    opts: ValidateOptions | undefined
  ) {
    super(opts)
  }

  validate = (obj: T, key: keyof T): string | void => {
    const value = obj[key]
    const valid = Array.isArray(value) && value.length >= this.minSize
    if (valid) return
    return this.opts?.customMessage || `${key} must have at least ${this.minSize} item(s)`
  }
}

export const minSize = <T> (
  value: number,
  opts?: ValidateOptions
): MinSizeValidation<T> => new MinSizeValidation<T>(value, opts)