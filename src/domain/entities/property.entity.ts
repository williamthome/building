import {
  ExtractDto,
  ExtractEntity,
  ExtractUpdateDto,
  limitedEntitySchema
} from '../protocols/entity.protocol'
import { object } from '../protocols/schema'
import { addressSchema } from './nested'

export const propertySchema = limitedEntitySchema({
  address: object().schemas({
    ...addressSchema['schemas']
  })
})

export type Property = ExtractEntity<typeof propertySchema>

export type CreatePropertyDto = ExtractDto<typeof propertySchema>

export type UpdatePropertyDto = ExtractUpdateDto<typeof propertySchema>
