import { ExtractDto, ExtractEntity, ExtractUpdateDto, limitedEntitySchema } from '../protocols/entity.protocol'
import { string } from '../protocols/schema'

export const customerSchema = limitedEntitySchema({
  name: string().required()
})

export type Customer = ExtractEntity<typeof customerSchema>

export type CreateCustomerDto = ExtractDto<typeof customerSchema>

export type UpdateCustomerDto = ExtractUpdateDto<typeof customerSchema>