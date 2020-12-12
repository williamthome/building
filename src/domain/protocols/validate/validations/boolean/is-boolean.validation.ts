import { Validate, ValidateOptions } from '../../validate.protocol'

class IsBooleanValidation extends Validate<IsBooleanValidation> {
  validation = (): IsBooleanValidation => this

  constructor (opts: ValidateOptions | undefined) { super(opts) }

  validate = (key: string, value: any): string | void => {
    const valid = typeof value === 'boolean'
    if (valid) return
    return this.opts?.customMessage || `${key} must be boolean type`
  }
}

export const isBoolean = (
  opts?: ValidateOptions
): IsBooleanValidation => new IsBooleanValidation(opts)