import { FileModel } from '@/data/models'

export type StorageUploadFile = Required<
  Pick<FileModel,
    | 'reference'
    | 'referenceId'
    | 'mimeType'
    | 'name'
  >
>

export type StorageDownloadFile = Omit<StorageUploadFile, 'mimeType'>

export interface Storage {
  upload: (
    file: StorageUploadFile,
    buffer: Buffer
  ) => Promise<void | Error>

  download: (
    file: StorageDownloadFile
  ) => Promise<Buffer>
}