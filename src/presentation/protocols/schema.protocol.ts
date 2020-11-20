import { Validation } from './validation.protocol'

// export interface ValidationOptions {
//   validation: Validation
//   message: string
// }

// export interface SchemaOptions {
//   validations: (Omit<Validation, 'validate'> | ValidationOptions)[]
// }

// export const isValidationOptions = (obj: any): obj is ValidationOptions =>
// (obj !== null || obj !== undefined) && obj === Object(obj) && 'validation' in obj && 'message' in obj

export interface SchemaOptions {
  validations: Validation[]
}

export interface NestedSchemaOptions<T extends Record<PropertyKey, any>, P extends keyof T> extends SchemaOptions {
  nested: Schema<T[P]>
}

export type Schema<T extends Record<PropertyKey, any>> = {
  [P in keyof T]-?: T[P] extends Record<PropertyKey, any>
  ? T[P] extends Array<any>
    ? SchemaOptions
    : NestedSchemaOptions<T, P>
  : SchemaOptions
}