import { Validate, ValidateOptions } from '../../validate.protocol'

class IsNumberValidation<T> extends Validate<T, IsNumberValidation<T>> {
  validation = (): IsNumberValidation<T> => this

  constructor(opts: ValidateOptions | undefined) {
    super(opts)
  }

  validate = (obj: T, key: keyof T): string | void => {
    const valid = typeof obj[key] === 'number'
    if (valid) return
    return this.opts?.customMessage || `${key} must be number type`
  }
}

export const isNumber = <T>(opts?: ValidateOptions): IsNumberValidation<T> =>
  new IsNumberValidation<T>(opts)
