import { FileModel, ProjectModel } from '@/data/models'

export interface DownloadProjectAttachmentBucket {
  downloadProjectAttachment: (
    projectId: ProjectModel['id'],
    fileName: FileModel['name']
  ) => Promise<Buffer>
}