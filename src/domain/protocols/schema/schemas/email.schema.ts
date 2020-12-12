import { BaseSchema, optional, required, reserved } from '../schema.protocol'
import { isEmail } from '../../validate/validations'
import { ValidateOptions } from '../../validate'

export class EmailSchema<T extends string, O extends optional | required | reserved> extends BaseSchema<T, O, EmailSchema<T, O>> {
  protected readonly builder = (): EmailSchema<T, O> => this

  constructor (isEmailValidationOptions: ValidateOptions | undefined) {
    super(isEmail(isEmailValidationOptions))
  }
}