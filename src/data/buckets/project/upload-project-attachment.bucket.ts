import { UploadProjectAttachmentData } from '@/data/models'

export interface UploadProjectAttachmentBucket {
  uploadProjectAttachment: (dto: UploadProjectAttachmentData, buffer: Buffer) => Promise<void | Error>
}