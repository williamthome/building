import { BaseSchema, optional, required, reserved } from '../schema.protocol'
import { isBoolean } from '../../validate/validations'
import { ValidateOptions } from '../../validate'

export class BooleanSchema<
  T extends boolean,
  O extends optional | required | reserved
> extends BaseSchema<T, O, BooleanSchema<T, O>> {
  protected readonly builder = (): BooleanSchema<T, O> => this

  constructor(isBooleanValidationOptions: ValidateOptions | undefined) {
    super(isBoolean(isBooleanValidationOptions))
  }
}
