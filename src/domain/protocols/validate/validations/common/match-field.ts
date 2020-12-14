import { Validate, ValidateOptions } from '../../validate.protocol'

class MatchFieldValidation<T> extends Validate<T, MatchFieldValidation<T>> {
  validation = (): MatchFieldValidation<T> => this

  constructor (
    private readonly keyToMatch: keyof T,
    opts: ValidateOptions | undefined
  ) { super(opts) }

  validate = (obj: T, key: keyof T): string | void => {
    const valid = obj[this.keyToMatch] === obj[key]
    if (valid) return
    return this.opts?.customMessage || `${this.keyToMatch} and ${key} do not match`
  }
}

export const matchField = <T> (
  field: keyof T,
  opts?: ValidateOptions
): MatchFieldValidation<T> => new MatchFieldValidation<T>(field, opts)