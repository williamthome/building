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
    fileName: string
  ): Promise<FileEntity | Error> => {
    const url = await this.uploadProjectAttachmentBucket
      .uploadFile(projectId, buffer, mimeType, fileName)

    if (url instanceof Error)
      return url

    return await this.addProjectAttachmentRepository
      .addProjectAttachment(
        projectId,
        {
          mimeType,
          url,
          sizeInBytes: buffer.byteLength
        }
      )
  }
}