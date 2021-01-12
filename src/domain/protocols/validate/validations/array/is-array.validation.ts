import { Validate, ValidateOptions } from '../../validate.protocol'

class IsArrayValidation<T> extends Validate<T, IsArrayValidation<T>> {
  validation = (): IsArrayValidation<T> => this

  constructor(opts: ValidateOptions | undefined) {
    super(opts)
  }

  validate = (obj: T, key: keyof T): string | void => {
    const valid = Array.isArray(obj[key])
    if (valid) return
    return this.opts?.customMessage || `${key} must be array type`
  }
}

export const isArray = <T>(opts?: ValidateOptions): IsArrayValidation<T> =>
  new IsArrayValidation<T>(opts)
