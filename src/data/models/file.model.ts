import { LimitedModel, Model } from '../protocols'
import { FileEntity } from '@/domain/entities'
import { CompanyModel } from './company.model'
import { CollectionName } from '@/shared/types'

export class FileModel extends LimitedModel implements FileEntity {
  constructor (
    public readonly id: Model['id'],
    public readonly companyId: CompanyModel['id'],
    public readonly reference: CollectionName,
    public readonly referenceId: Model['id'],
    public readonly name: string,
    public readonly mimeType: string,
    public readonly sizeInBytes: number
  ) {
    super(id, companyId)
  }
}