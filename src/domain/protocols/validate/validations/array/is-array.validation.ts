import { Validate, ValidateOptions } from '../../validate.protocol'

class IsArrayValidation extends Validate<IsArrayValidation> {
  validation = (): IsArrayValidation => this

  constructor (opts: ValidateOptions | undefined) { super(opts) }

  validate = (key: string, value: any): string | void => {
    const valid = Array.isArray(value)
    if (valid) return
    return this.opts?.customMessage || `${key} must be array type`
  }
}

export const isArray = (
  opts?: ValidateOptions
): IsArrayValidation => new IsArrayValidation(opts)