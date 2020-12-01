import { Inject, Injectable } from '@/shared/dependency-injection'
import { UploadProjectAttachmentBucket } from '@/data/buckets'
import { Storage } from '@/infra/protocols'
import { StorageDownloadFile } from '@/data/protocols'
import { ProjectModel } from '@/data/models'

@Injectable('uploadProjectAttachmentBucket')
export class DbUploadProjectAttachmentBucket implements UploadProjectAttachmentBucket {

  constructor (
    @Inject('storage') private readonly storage: Storage
  ) { }

  uploadFile = async (
    projectId: ProjectModel['id'],
    buffer: StorageDownloadFile['buffer'],
    mimeType: StorageDownloadFile['mimeType'],
    fileName: string
  ): Promise<StorageDownloadFile['url'] | Error> => {
    return await this.storage.upload(
      {
        reference: 'projects',
        referenceId: projectId,
        mimeType
      },
      buffer,
      fileName
    )
  }
}