import { BaseSchema, optional, required, reserved } from '../schema.protocol'
import { isArray, minSize } from '../../validate/validations'
import { ValidateOptions } from '../../validate'

export class ArraySchema<T, O extends optional | required | reserved> extends BaseSchema<Array<T>, O, ArraySchema<T, O>> {
  protected readonly builder = (): ArraySchema<T, O> => this

  constructor (isArrayValidationOptions: ValidateOptions | undefined) {
    super(isArray(isArrayValidationOptions))
  }

  minSize = (value: number, opts?: ValidateOptions): ArraySchema<T, O> => {
    return this.pushValidation(minSize(value, opts))
  }
}