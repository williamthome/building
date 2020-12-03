// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { GetAllProjectAttachmentsRepository } from '@/data/repositories'
// < Only Domain
import { GetAllProjectAttachmentsUseCase } from '@/domain/usecases'
import { ProjectEntity } from '@/domain/entities'
import { FileEntityResponse } from '@/domain/protocols'

@Injectable('getAllProjectAttachmentsUseCase')
export class GetAllProjectAttachmentsContract implements GetAllProjectAttachmentsUseCase {

  constructor (
    @Inject()
    private readonly getAllProjectAttachmentsRepository: GetAllProjectAttachmentsRepository
  ) { }

  call = async (
    projectId: ProjectEntity['id']
  ): Promise<FileEntityResponse[] | null> => {
    const attachments = await this.getAllProjectAttachmentsRepository.getAllProjectAttachments(projectId)
    if (!attachments)
      return null

    return attachments.map(attachment => {
      return {
        id: attachment.id,
        name: attachment.name,
        mimeType: attachment.mimeType,
        sizeInBytes: attachment.sizeInBytes
      }
    })
  }
}