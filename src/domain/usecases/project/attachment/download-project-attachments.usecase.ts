import { File, Project } from '@/domain/entities'

export interface DownloadProjectAttachmentUseCase {
  call: (projectId: Project['id'], attachmentId: File['id']) => Promise<Buffer | null>
}
