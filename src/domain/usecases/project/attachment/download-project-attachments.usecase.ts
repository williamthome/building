import { FileEntity, ProjectEntity } from '@/domain/entities'

export interface DownloadProjectAttachmentUseCase {
  call: (
    projectId: ProjectEntity['id'],
    attachmentId: FileEntity['id']
  ) => Promise<Buffer | null>
}