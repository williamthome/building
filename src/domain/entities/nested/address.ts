import { optional } from '@/domain/protocols'
import { Schema, ExtractSchema, string } from '../../protocols/schema'

export const addressSchema = new Schema({
  street: string<optional>(),
  city: string().required(),
  state: string().required()
})

export type AddressEntity = ExtractSchema<typeof addressSchema>