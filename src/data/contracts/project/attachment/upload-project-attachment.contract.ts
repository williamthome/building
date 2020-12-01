// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { UploadProjectAttachmentBucket } from '@/data/buckets'
import { AddProjectAttachmentRepository } from '@/data/repositories'
// < Only Domain
import { UploadProjectAttachmentUseCase } from '@/domain/usecases'
import { FileEntity, ProjectEntity } from '@/domain/entities'

@Injectable('uploadProjectAttachmentUseCase')
export class UploadProjectAttachmentContract implements UploadProjectAttachmentUseCase {

  constructor (
    @Inject()
    private readonly uploadProjectAttachmentBucket: UploadProjectAttachmentBucket,

    @Inject()
    private readonly addProjectAttachmentRepository: AddProjectAttachmentRepository
  ) { }

  call = async (
    projectId: ProjectEntity['id'],
    mimeType: FileEntity['mimeType'],
    buffer: Buffer,
    fileName: FileEntity['name']
  ): Promise<FileEntity | Error> => {
    const uploadError = await this.uploadProjectAttachmentBucket
      .uploadProjectAttachment(projectId, buffer, mimeType, fileName)

    if (uploadError)
      return uploadError

    return await this.addProjectAttachmentRepository
      .addProjectAttachment(
        projectId,
        {
          name: fileName,
          mimeType,
          sizeInBytes: buffer.byteLength
        }
      )
  }
}