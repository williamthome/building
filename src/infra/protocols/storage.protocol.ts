import { FileData } from '@/data/models'
import { OmitKey } from '@/shared/types'

export type StorageUploadFile = Required<
  Pick<FileData, 'reference' | 'referenceId' | 'mimeType' | 'name'>
>

export type StorageDownloadFile = OmitKey<StorageUploadFile, 'mimeType'>

export interface Storage {
  upload: (file: StorageUploadFile, buffer: Buffer) => Promise<void | Error>

  download: (file: StorageDownloadFile) => Promise<Buffer>
}
