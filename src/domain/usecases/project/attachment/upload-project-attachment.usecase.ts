import { FileEntity, ProjectEntity } from '@/domain/entities'

export interface UploadProjectAttachmentUseCase {
  call: (
    projectId: ProjectEntity['id'],
    mimeType: FileEntity['mimeType'],
    buffer: Buffer,
    fileName: FileEntity['name']
  ) => Promise<FileEntity | Error>
}