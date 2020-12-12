import { Validate, ValidateOptions } from '../../validate.protocol'

class MinSizeValidation extends Validate<MinSizeValidation> {
  validation = (): MinSizeValidation => this

  constructor (
    private readonly minSize: number,
    opts: ValidateOptions | undefined
  ) {
    super(opts)
  }

  validate = (key: string, value: any): string | void => {
    const valid = Array.isArray(value) && value.length >= this.minSize
    if (valid) return
    return this.opts?.customMessage || `${key} must have at least ${this.minSize} item(s)`
  }
}

export const minSize = (
  value: number,
  opts?: ValidateOptions
): MinSizeValidation => new MinSizeValidation(value, opts)