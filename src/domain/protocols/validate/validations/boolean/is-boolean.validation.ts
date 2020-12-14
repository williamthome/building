import { Validate, ValidateOptions } from '../../validate.protocol'

class IsBooleanValidation<T> extends Validate<T, IsBooleanValidation<T>> {
  validation = (): IsBooleanValidation<T> => this

  constructor (opts: ValidateOptions | undefined) { super(opts) }

  validate = (obj: T, key: keyof T): string | void => {
    const valid = typeof obj[key] === 'boolean'
    if (valid) return
    return this.opts?.customMessage || `${key} must be boolean type`
  }
}

export const isBoolean = <T> (
  opts?: ValidateOptions
): IsBooleanValidation<T> => new IsBooleanValidation<T>(opts)