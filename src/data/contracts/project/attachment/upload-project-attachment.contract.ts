// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { UploadProjectAttachmentBucket } from '@/data/buckets'
import { AddProjectAttachmentRepository } from '@/data/repositories'
// < Only Domain
import { UploadProjectAttachmentUseCase } from '@/domain/usecases'
import { File, UploadProjectAttachmentDto } from '@/domain/entities'

@Injectable('uploadProjectAttachmentUseCase')
export class UploadProjectAttachmentContract implements UploadProjectAttachmentUseCase {
  constructor(
    @Inject()
    private readonly uploadProjectAttachmentBucket: UploadProjectAttachmentBucket,

    @Inject()
    private readonly addProjectAttachmentRepository: AddProjectAttachmentRepository
  ) {}

  call = async (dto: UploadProjectAttachmentDto, buffer: Buffer): Promise<File | Error> => {
    const uploadError = await this.uploadProjectAttachmentBucket.uploadProjectAttachment(
      dto,
      buffer
    )
    if (uploadError) return uploadError

    return await this.addProjectAttachmentRepository.addProjectAttachment(dto)
  }
}
