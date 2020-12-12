import { Schema } from './schema'
import { ObjectSchema } from './schemas/object.schema'
import { ValidateOptions, Validation } from '../validate'

export abstract class BaseSchema<Type, Optional extends optional | required | reserved, Builder extends BaseSchema<Type, Optional, Builder>> {
  protected readonly type!: Type
  protected readonly optional!: Optional
  protected abstract readonly builder: () => Builder
  protected readonly validations: Validation[] = []
  protected isRequired = false
  protected isNonWritable = false
  protected customRequiredMessage?: string
  protected customNonWritableMessage?: string

  constructor (typeValidation?: Validation) {
    if (typeValidation)
      this.validations.push(typeValidation)
  }

  protected pushValidation = (validation: Validation): Builder => {
    this.validations.push(validation)
    return this.builder()
  }

  required = (opts?: ValidateOptions): Builder => {
    this.isRequired = true
    this.customRequiredMessage = opts?.customMessage
    return this.builder()
  }

  nonWritable = (opts?: ValidateOptions): Builder => {
    this.isNonWritable = true
    this.customNonWritableMessage = opts?.customMessage
    return this.builder()
  }
}

export interface ValidateSchemaOptions<T> {
  allKeys?: boolean
  mustBeTruthy?: boolean
  customMessageIfNotTruthy?: string,
  bannedFields?: Array<keyof T & string> | string[]
}

export type optional = 'optional'
export type required = 'required'
export type reserved = 'reserved'

type ExtractTypesOf<T> = T extends BaseSchema<any, any, any>
  ? T extends ObjectSchema<infer TObject, infer TOptional>
  ? { [K in keyof TObject]: ExtractTypesOf<TObject[K]> } | (TOptional extends optional ? undefined : never)
  : T extends BaseSchema<infer Type, infer TOptional, any> ? TOptional extends optional ? Type | undefined : Type : never
  : T extends { [k: string]: any }
  ? { [K in keyof T]: ExtractTypesOf<T[K]> }
  : never

export type ExtractSchema<
  T,
  K extends (T extends Schema<infer TSchema> ? keyof TSchema : T extends BaseSchema<infer TSchema, any, any> ? keyof TSchema : never) = never
  > = T extends Schema<infer U>
  ? Pick<ExtractTypesOf<U>, Exclude<keyof ExtractTypesOf<U>, K>>
  : T extends BaseSchema<infer U, any, any>
    ? Pick<ExtractTypesOf<U>, Exclude<keyof ExtractTypesOf<U>, K>>
    : never

type ExtractNonReservedTypesOf<T> = T extends BaseSchema<any, any, any>
  ? T extends ObjectSchema<infer TObject, infer TOptional>
  ? TOptional extends reserved | (reserved | optional)
    ? never
    : { [K in keyof TObject]: ExtractNonReservedTypesOf<TObject[K]> } | (TOptional extends optional ? undefined : never)
  : T extends BaseSchema<infer Type, infer TOptional, any>
  ? TOptional extends reserved | (reserved | optional)
    ? never
    : TOptional extends optional ? Type | undefined : Type : never
  : T extends { [k: string]: any }
  ? { [K in keyof T]: ExtractNonReservedTypesOf<T[K]> }
  : never

type ExcludeKeysWithTypeOf<T, V> = {
  [K in keyof T]: Exclude<T[K], undefined> extends V ? never : K
}[keyof T]

type Without<T, V> = Pick<T, ExcludeKeysWithTypeOf<T, V>>;

export type ExtractNonReservedSchema<
  T,
  K extends (T extends Schema<infer TSchema> ? keyof TSchema : never) = never
  > = T extends Schema<infer U>
  ? Without<Pick<ExtractNonReservedTypesOf<U>, Exclude<keyof ExtractNonReservedTypesOf<U>, K>>, never>
  : never

type ExtractPartial<T> = T extends Schema<infer TSchema>
  ? { [K in keyof TSchema]?: TSchema[K] extends ObjectSchema<any, any>
    ? ExtractPartial<TSchema[K]>
    : TSchema[K] extends BaseSchema<infer U, any, any>
    ? U
    : never
  }
  : T extends ObjectSchema<infer U, any>
  ? { [K in keyof U]?: ExtractPartial<U[K]> }
  : T extends BaseSchema<infer U, any, any>
  ? U
  : never

export type ExtractPartialSchema<
  T,
  K extends (T extends Schema<infer TSchema> ? keyof TSchema : never) = never
  > = Pick<ExtractPartial<T>, Exclude<keyof ExtractPartial<T>, K>>

type ExtractPartialNonReserved<T> = T extends Schema<infer TSchema>
  ? { [K in keyof TSchema]?: TSchema[K] extends ObjectSchema<any, infer TOptions>
    ? TOptions extends reserved | (reserved | optional)
      ? never
      : ExtractPartialNonReserved<TSchema[K]>
    : TSchema[K] extends BaseSchema<infer U, infer TOptions, any>
      ? TOptions extends reserved | (reserved | optional)
        ? never
        : U
      : never
  }
  : T extends ObjectSchema<infer U, any>
  ? { [K in keyof U]?: ExtractPartialNonReserved<U[K]> }
  : T extends BaseSchema<infer U, any, any>
  ? U
  : never

export type ExtractNonReservedPartialSchema<
  T,
  K extends (T extends Schema<infer TSchema> ? keyof TSchema : never) = never
  > = Without<Pick<ExtractPartialNonReserved<T>, Exclude<keyof ExtractPartialNonReserved<T>, K>>, undefined>

export type ExtractClass<T> = new (args: { [K in keyof ExtractSchema<T>]-?: ExtractSchema<T>[K] }) => typeof args