import { Schema, string } from './schema'
import { StringSchema } from './schema/schemas/string.schema'
import {
  ExtractNonReservedPartialSchema,
  ExtractNonReservedSchema,
  ExtractSchema,
  reserved
} from './schema/schema.protocol'

type EntityConstructor<T> = {
  id: StringSchema<string, reserved>
} & T

type LimitedEntityConstructor<T> = {
  id: StringSchema<string, reserved>
  companyId: StringSchema<string, reserved>
} & T

export { ExtractSchema as ExtractEntity }

export type ExtractDto<
  T,
  K extends T extends Schema<any>
    ? keyof Omit<ExtractNonReservedSchema<T>, 'id' | 'companyId'>
    : never = never
> = T extends LimitedEntityConstructor<any>
  ? Pick<
      ExtractNonReservedSchema<T>,
      Exclude<keyof Omit<ExtractNonReservedSchema<T>, 'id' | 'companyId'>, K>
    >
  : T extends EntityConstructor<any>
  ? Pick<ExtractNonReservedSchema<T>, Exclude<keyof Omit<ExtractNonReservedSchema<T>, 'id'>, K>>
  : Pick<ExtractNonReservedSchema<T>, Exclude<keyof ExtractNonReservedSchema<T>, K>>

export type ExtractUpdateDto<
  T,
  K extends T extends Schema<infer TSchema>
    ? keyof Omit<TSchema, 'id' | 'companyId'>
    : never = never
> = Omit<ExtractNonReservedPartialSchema<T, K>, 'id' | 'companyId'>

export const idStringSchema = string().required()
export const idSchema = new Schema({
  id: idStringSchema
})

const entityIdSchema = string<reserved>().nonWritable()

export const entitySchema = <T>(schemas: T): Schema<EntityConstructor<T>> =>
  new Schema<EntityConstructor<T>>({
    id: entityIdSchema,
    ...schemas
  })

export const limitedEntitySchema = <T>(schemas: T): Schema<LimitedEntityConstructor<T>> =>
  new Schema<LimitedEntityConstructor<T>>({
    id: entityIdSchema,
    companyId: entityIdSchema,
    ...schemas
  })
