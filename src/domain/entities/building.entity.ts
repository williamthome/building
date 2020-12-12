import { ExtractDto, ExtractEntity, ExtractUpdateDto, limitedEntitySchema } from '../protocols/entity.protocol'
import { string } from '../protocols/schema'

export const buildingSchema = limitedEntitySchema({
  title: string().required()
})

export type Building = ExtractEntity<typeof buildingSchema>

export type CreateBuildingDto = ExtractDto<typeof buildingSchema>

export type UpdateBuildingDto = ExtractUpdateDto<typeof buildingSchema>