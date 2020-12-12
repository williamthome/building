import { BaseSchema, optional, required, reserved } from '../schema.protocol'
import { isObject } from '../../validate/validations'
import { ValidateOptions } from '../../validate'

export class ObjectSchema<T, O extends optional | required | reserved> extends BaseSchema<T, O, ObjectSchema<T, O>> {
  protected readonly builder = (): ObjectSchema<T, O> => this
  constructor (
    protected readonly schemas: T,
    isObjectValidationOptions: ValidateOptions | undefined
  ) {
    super(isObject(isObjectValidationOptions))
  }
}