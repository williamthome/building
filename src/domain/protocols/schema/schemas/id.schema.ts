import { BaseSchema, optional, required, reserved } from '../schema.protocol'
import { isId } from '../../validate/validations'
import { ValidateOptions } from '../../validate'

export class IdSchema<
  T extends string,
  O extends optional | required | reserved
> extends BaseSchema<T, O, IdSchema<T, O>> {
  protected readonly builder = (): IdSchema<T, O> => this

  constructor(isIdValidationOptions: ValidateOptions | undefined) {
    super(isId(isIdValidationOptions))
  }
}
