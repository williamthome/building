import {
  ExtractDto,
  ExtractEntity,
  ExtractUpdateDto,
  limitedEntitySchema
} from '../protocols/entity.protocol'
import { string, array } from '../protocols/schema'

export const technicianSchema = limitedEntitySchema({
  name: string().required(),
  technicalRegisters: array<string>().required()
})

export type Technician = ExtractEntity<typeof technicianSchema>

export type CreateTechnicianDto = ExtractDto<typeof technicianSchema>

export type UpdateTechnicianDto = ExtractUpdateDto<typeof technicianSchema>
