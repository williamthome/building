import { ValidateOptions } from '../../validate'
import { isNumber, range } from '../../validate/validations'
import { BaseSchema, optional, required, reserved } from '../schema.protocol'

export class NumberSchema<T extends number, O extends optional | required | reserved> extends BaseSchema<T, O, NumberSchema<T, O>> {
  protected readonly builder = (): NumberSchema<T, O> => this

  constructor (isNumberValidationOptions: ValidateOptions | undefined) {
    super(isNumber(isNumberValidationOptions))
  }

  range = (min: number, max: number, opts?: ValidateOptions): NumberSchema<T, O> => {
    return this.pushValidation(range(min, max, opts))
  }
}