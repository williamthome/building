import { Validate, ValidateOptions } from '../../validate.protocol'

class IsIdValidation<T> extends Validate<T, IsIdValidation<T>> {
  validation = (): IsIdValidation<T> => this

  constructor(opts: ValidateOptions | undefined) {
    super(opts)
  }

  validate = (obj: T, key: keyof T): string | void => {
    const value = obj[key]
    const valid = typeof value === 'string' && value !== ''
    if (valid) return
    return this.opts?.customMessage || `${key} is an invalid id`
  }
}

export const isId = <T>(opts?: ValidateOptions): IsIdValidation<T> => new IsIdValidation<T>(opts)
