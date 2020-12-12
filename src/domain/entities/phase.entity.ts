import { ExtractDto, ExtractEntity, ExtractUpdateDto, limitedEntitySchema } from '../protocols/entity.protocol'
import { string, array } from '../protocols/schema'

export const phaseSchema = limitedEntitySchema({
  buildingId: string().required(),
  participantIds: array<string>().required().minSize(1),
  title: string().required()
})

export type Phase = ExtractEntity<typeof phaseSchema>

export type CreatePhaseDto = ExtractDto<typeof phaseSchema>

export type UpdatePhaseDto = ExtractUpdateDto<typeof phaseSchema, 'buildingId'>