import { Inject, Injectable } from '@/shared/dependency-injection'
import { UploadProjectAttachmentBucket } from '@/data/buckets'
import { Storage } from '@/infra/protocols'
import { UploadProjectAttachmentData } from '@/data/models'

@Injectable('uploadProjectAttachmentBucket')
export class StUploadProjectAttachmentBucket implements UploadProjectAttachmentBucket {

  constructor (
    @Inject('storage') private readonly storage: Storage
  ) { }

  uploadProjectAttachment = async (dto: UploadProjectAttachmentData, buffer: Buffer): Promise<void | Error> => {
    return await this.storage.upload(
      {
        reference: 'projects',
        ...dto
      },
      buffer
    )
  }
}