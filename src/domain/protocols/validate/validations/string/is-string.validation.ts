import { Validate, ValidateOptions } from '../../validate.protocol'

class IsStringValidation extends Validate<IsStringValidation> {
  validation = (): IsStringValidation => this

  constructor (opts: ValidateOptions | undefined) { super(opts) }

  validate = (key: string, value: any): string | void => {
    const valid = typeof value === 'string' && value !== ''
    if (valid) return
    return this.opts?.customMessage || `${key} must be string type`
  }
}

export const isString = (
  opts?: ValidateOptions
): IsStringValidation => new IsStringValidation(opts)