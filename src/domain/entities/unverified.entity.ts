import { entitySchema, ExtractDto, ExtractEntity } from '../protocols/entity.protocol'
import { string, number } from '../protocols/schema'

export const unverifiedSchema = entitySchema({
  userId: string().required(),
  expiresIn: number().required(),
})

export type Unverified = ExtractEntity<typeof unverifiedSchema>

export type CreateUnverifiedDto = ExtractDto<typeof unverifiedSchema>