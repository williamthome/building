import { Validate, ValidateOptions } from '../../validate.protocol'

class IsStringValidation<T> extends Validate<T, IsStringValidation<T>> {
  validation = (): IsStringValidation<T> => this

  constructor(opts: ValidateOptions | undefined) {
    super(opts)
  }

  validate = (obj: T, key: keyof T): string | void => {
    const value = obj[key]
    const valid = typeof value === 'string' && value !== ''
    if (valid) return
    return this.opts?.customMessage || `${key} must be string type`
  }
}

export const isString = <T>(opts?: ValidateOptions): IsStringValidation<T> =>
  new IsStringValidation<T>(opts)
