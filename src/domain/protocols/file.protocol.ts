import { FileEntity } from '../entities'

export interface UploadFileUseCase {
  call: (
    referenceId: FileEntity['referenceId'],
    mimeType: FileEntity['mimeType'],
    buffer: Buffer,
    fileName: string
  ) => Promise<FileEntity | Error>
}