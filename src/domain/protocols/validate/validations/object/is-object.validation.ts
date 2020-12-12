import { Validate, ValidateOptions } from '../../validate.protocol'

class IsObjectValidation extends Validate<IsObjectValidation> {
  validation = (): IsObjectValidation => this

  constructor (opts: ValidateOptions | undefined) { super(opts) }

  validate = (key: string, value: any): string | void => {
    const valid = value === Object(value)
    if (valid) return
    return this.opts?.customMessage || `${key} must be object type`
  }
}

export const isObject = (
  opts?: ValidateOptions
): IsObjectValidation => new IsObjectValidation(opts)