import { Model } from '../protocols'
import { FileEntity } from '@/domain/entities'

export class FileModel extends Model implements FileEntity {
  constructor (
    public readonly id: FileEntity['id'],
    public readonly reference: FileEntity['reference'],
    public readonly referenceId: FileEntity['referenceId'],
    public readonly name: FileEntity['name'],
    public readonly mimeType: FileEntity['mimeType'],
    public readonly sizeInBytes: FileEntity['sizeInBytes']
  ) {
    super(id)
  }
}