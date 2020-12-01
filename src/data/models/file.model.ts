import { Model } from '../protocols'
import { FileEntity } from '@/domain/entities'

export class FileModel extends Model implements FileEntity {
  constructor (
    public readonly id: FileEntity['id'],
    public readonly reference: FileEntity['reference'],
    public readonly referenceId: FileEntity['referenceId'],
    public readonly url: FileEntity['url'],
    public readonly mimeType: FileEntity['mimeType'],
    public readonly sizeInBytes: FileEntity['sizeInBytes']
  ) {
    super(id)
  }
}