import { entitySchema, ExtractDto, ExtractEntity } from '../protocols/entity.protocol'
import { string, number } from '../protocols/schema'

export const logErrorSchema = entitySchema({
  stack: string(),
  date: number()
})

export type LogError = ExtractEntity<typeof logErrorSchema>

export type CreateLogErrorDto = ExtractDto<typeof logErrorSchema>
