import { Validate, ValidateOptions } from '../../validate.protocol'

class IsNumberValidation extends Validate<IsNumberValidation> {
  validation = (): IsNumberValidation => this

  constructor (opts: ValidateOptions | undefined) {
    super(opts)
  }

  validate = (key: string, value: any): string | void => {
    const valid = typeof value === 'number'
    if (valid) return
    return this.opts?.customMessage || `${key} must be number type`
  }
}

export const isNumber = (
  opts?: ValidateOptions
): IsNumberValidation => new IsNumberValidation(opts)