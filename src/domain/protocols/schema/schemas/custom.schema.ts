import { BaseSchema, optional, required, reserved } from '../schema.protocol'

export class CustomSchema<T, O extends optional | required | reserved> extends BaseSchema<T, O, CustomSchema<T, O>> {
  protected readonly builder = (): CustomSchema<T, O> => this
}