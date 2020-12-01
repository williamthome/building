import { FileModel, ProjectModel } from '@/data/models'

export interface UploadProjectAttachmentBucket {
  uploadProjectAttachment: (
    projectId: ProjectModel['id'],
    buffer: Buffer,
    mimeType: FileModel['mimeType'],
    fileName: FileModel['name']
  ) => Promise<void | Error>
}