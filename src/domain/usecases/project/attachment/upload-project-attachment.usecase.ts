import { UploadProjectAttachmentDto, File } from '@/domain/entities'

export interface UploadProjectAttachmentUseCase {
  call: (dto: UploadProjectAttachmentDto, buffer: Buffer) => Promise<File | Error>
}