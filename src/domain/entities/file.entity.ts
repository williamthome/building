import { CollectionName } from '@/shared/types'
import { ExtractDto, ExtractEntity, limitedEntitySchema } from '../protocols/entity.protocol'
import { string, number } from '../protocols/schema'

export const fileSchema = limitedEntitySchema({
  reference: string<CollectionName>().required(),
  referenceId: string(),
  name: string(),
  mimeType: string(),
  sizeInBytes: number()
})

export type File = ExtractEntity<typeof fileSchema>

export type CreateFileDto = ExtractDto<typeof fileSchema>
