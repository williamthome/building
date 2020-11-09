import { Validation } from './validation.protocol'

export interface SchemaOptions {
  validations: Validation[]
}

export interface NestedSchemaOptions<T extends Record<PropertyKey, any>, P extends keyof T> extends SchemaOptions {
  nested: Schema<T[P]>
}

export type Schema<T extends Record<PropertyKey, any>> = {
  [P in keyof T]-?: T[P] extends Record<PropertyKey, any>
  ? NestedSchemaOptions<T, P>
  : SchemaOptions
}