// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { DownloadProjectAttachmentBucket } from '@/data/buckets'
import { GetFileByIdRepository } from '@/data/repositories'
// < Only Domain
import { DownloadProjectAttachmentUseCase } from '@/domain/usecases'
import { FileEntity, ProjectEntity } from '@/domain/entities'

@Injectable('downloadProjectAttachmentUseCase')
export class DownloadProjectAttachmentContract implements DownloadProjectAttachmentUseCase {

  constructor (
    @Inject()
    private readonly getFileByIdRepository: GetFileByIdRepository,

    @Inject()
    private readonly downloadProjectAttachmentBucket: DownloadProjectAttachmentBucket
  ) { }

  call = async (
    projectId: ProjectEntity['id'],
    attachmentId: FileEntity['id']
  ): Promise<Buffer | null> => {
    const attachment = await this.getFileByIdRepository.getFileById(attachmentId)
    if (!attachment)
      return null

    return await this.downloadProjectAttachmentBucket.downloadProjectAttachment(
      projectId,
      attachment.name
    )
  }
}