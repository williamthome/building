import { FileData, ProjectData } from '@/data/models'

export interface DownloadProjectAttachmentBucket {
  downloadProjectAttachment: (projectId: ProjectData['id'], fileName: FileData['name']) => Promise<Buffer>
}