import { Inject, Injectable } from '@/shared/dependency-injection'
import { UploadProjectAttachmentBucket } from '@/data/buckets'
import { Storage } from '@/infra/protocols'
import { FileModel, ProjectModel } from '@/data/models'

@Injectable('uploadProjectAttachmentBucket')
export class StUploadProjectAttachmentBucket implements UploadProjectAttachmentBucket {

  constructor (
    @Inject('storage') private readonly storage: Storage
  ) { }

  uploadProjectAttachment = async (
    projectId: ProjectModel['id'],
    buffer: Buffer,
    mimeType: FileModel['mimeType'],
    fileName: FileModel['name']
  ): Promise<void | Error> => {
    return await this.storage.upload(
      {
        reference: 'projects',
        referenceId: projectId,
        mimeType,
        name: fileName
      },
      buffer
    )
  }
}