import { CollectionName } from '@/shared/types'
import { Entity, LimitedEntity } from '../protocols'

export interface FileEntity extends LimitedEntity {
  reference: CollectionName
  referenceId: Entity['id']
  name: string
  mimeType: string
  sizeInBytes: number
}