import { Validate, ValidateOptions } from '../../validate.protocol'

class IsObjectValidation<T> extends Validate<T, IsObjectValidation<T>> {
  validation = (): IsObjectValidation<T> => this

  constructor (opts: ValidateOptions | undefined) { super(opts) }

  validate = (obj: T, key: keyof T): string | void => {
    const value = obj[key]
    const valid = value === Object(value)
    if (valid) return
    return this.opts?.customMessage || `${key} must be object type`
  }
}

export const isObject = <T> (
  opts?: ValidateOptions
): IsObjectValidation<T> => new IsObjectValidation<T>(opts)