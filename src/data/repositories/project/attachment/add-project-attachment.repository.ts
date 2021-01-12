import { FileData, UploadProjectAttachmentData } from '@/data/models'

export interface AddProjectAttachmentRepository {
  addProjectAttachment: (dto: UploadProjectAttachmentData) => Promise<FileData>
}
