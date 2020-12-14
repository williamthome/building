import { ValidateOptions } from '../../validate'
import { Schema } from '../schema'
import { BaseSchema, optional, required, reserved } from '../schema.protocol'
import { ArraySchema } from './array.schema'
import { BooleanSchema } from './boolean.schema'
import { CustomSchema } from './custom.schema'
import { NumberSchema } from './number.schema'
import { ObjectSchema } from './object.schema'
import { StringSchema } from './string.schema'
import { EmailSchema } from './email.schema'

/// HELPERS ------------------------------------------------

type OptionsOrType<T> = optional | required | reserved | T
type InvertOptionsAndType<O, T> = O extends (optional | required | reserved) ? T : optional | required | reserved
type OptionsResponse<O, T> = O extends (optional | required | reserved) ? T : required

type SchemaType<U, T, O> = T extends (optional | required | reserved) ? O extends U ? O : never : T
type SchemaOptions<T, O> = O extends (optional | required | reserved) ? O : T extends (optional | required | reserved) ? T : never

const schema = <TSchema, TPickSchema extends Schema<any>, KPickSchema extends (TPickSchema extends Schema<infer TSchema> ? keyof TSchema : never)> (
  schemas: TSchema,
  pick?: {
    merge: TPickSchema,
    keys: KPickSchema[]
  }
): Schema<TSchema & Pick<TPickSchema extends Schema<infer TSchema> ? TSchema : never, KPickSchema>> => {
  if (pick) {
    for (const key of pick.keys || Object.keys(pick.merge)) {
      (schemas as  any)[key] = pick.merge['schemas'][key]
    }
  }
  return new Schema<any>(schemas)
}

const pickSchema = <T extends Schema<any>, K extends (T extends Schema<infer TSchema> ? keyof TSchema : never)> (
  schema: T,
  keys?: K[]
): Schema<Pick<T extends Schema<infer TSchema> ? TSchema : never, K>> => {
  const schemas: any = {}
  for (const key of keys || Object.keys(schema)) {
    schemas[key] = schema['schemas'][key]
  }
  return new Schema(schemas)
}

/// STRING ------------------------------------------------

const string = <O extends OptionsOrType<string> = required, T extends InvertOptionsAndType<O, string> = OptionsResponse<O, string>> (
  isStringValidationOptions?: ValidateOptions
): StringSchema<SchemaType<string, T, O>, SchemaOptions<T, O>> => new StringSchema<SchemaType<string, T, O>, SchemaOptions<T, O>>(isStringValidationOptions)

/// EMAIL ------------------------------------------------

const email = <O extends OptionsOrType<string> = required, T extends InvertOptionsAndType<O, string> = OptionsResponse<O, string>> (
  isEmailValidationOptions?: ValidateOptions
): EmailSchema<SchemaType<string, T, O>, SchemaOptions<T, O>> => new EmailSchema<SchemaType<string, T, O>, SchemaOptions<T, O>>(isEmailValidationOptions)

/// NUMBER ------------------------------------------------

const number = <O extends OptionsOrType<number> = required, T extends InvertOptionsAndType<O, number> = OptionsResponse<O, number>> (
  isNumberValidationOptions?: ValidateOptions
): NumberSchema<SchemaType<number, T, O>, SchemaOptions<T, O>> => new NumberSchema<SchemaType<number, T, O>, SchemaOptions<T, O>>(isNumberValidationOptions)

/// BOOLEAN ------------------------------------------------

const boolean = <O extends OptionsOrType<boolean> = required, T extends InvertOptionsAndType<O, boolean> = OptionsResponse<O, boolean>> (
  isBooleanValidationOptions?: ValidateOptions
): BooleanSchema<SchemaType<boolean, T, O>, SchemaOptions<T, O>> => new BooleanSchema<SchemaType<boolean, T, O>, SchemaOptions<T, O>>(isBooleanValidationOptions)

/// ARRAY ------------------------------------------------

const array = <T, O extends optional | required | reserved = required> (
  isArrayValidationOptions?: ValidateOptions
): ArraySchema<T, O> => new ArraySchema<T, O>(isArrayValidationOptions)

/// OBJECT ------------------------------------------------

const object = <O extends optional | required | reserved = required> (
  isObjectValidationOptions?: ValidateOptions
): { schemas<T extends { [x: string]: BaseSchema<any, any, any> }> (schemas: T): ObjectSchema<T, O> } => {
  return {
    schemas<T extends { [x: string]: BaseSchema<any, any, any> }> (schemas: T): ObjectSchema<T, O> {
      return new ObjectSchema<T, O>(schemas, isObjectValidationOptions)
    }
  }
}

/// CUSTOM ------------------------------------------------

const custom = <T, O extends optional | required | reserved = required> (): CustomSchema<T, O> => new CustomSchema<T, O>()

/// EXPORT ------------------------------------------------

export {
  schema,
  pickSchema,
  string,
  email,
  number,
  boolean,
  array,
  object,
  custom
}