import { BaseSchema, optional, required, reserved } from '../schema.protocol'
import { isString, minLength } from '../../validate/validations'
import { ValidateOptions } from '../../validate'

export class StringSchema<
  T extends string,
  O extends optional | required | reserved
> extends BaseSchema<T, O, StringSchema<T, O>> {
  protected readonly builder = (): StringSchema<T, O> => this

  constructor(isStringValidationOptions: ValidateOptions | undefined) {
    super(isString(isStringValidationOptions))
  }

  minLength = (value: number, opts?: ValidateOptions): StringSchema<T, O> => {
    this.validations.push(minLength(value, opts))
    return this
  }
}
