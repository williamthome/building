import { CollectionName } from '@/shared/types'
import { Entity } from '../protocols'

export interface FileEntity extends Entity {
  reference: CollectionName
  referenceId: Entity['id']
  url: string
  mimeType: string
  sizeInBytes: number
}