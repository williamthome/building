import { FileModel } from '../models'

export type FileModelDto = Pick<FileModel, 'mimeType' | 'url' | 'sizeInBytes'>

export type StorageUploadFile = Pick<FileModel,
  | 'reference'
  | 'referenceId'
  | 'mimeType'
>

export interface StorageDownloadFile {
  url: string
  buffer: Buffer
  mimeType: string
}

export interface UploadFileBucket {
  uploadFile: (
    referenceId: StorageUploadFile['referenceId'],
    buffer: StorageDownloadFile['buffer'],
    mimeType: StorageDownloadFile['mimeType'],
    fileName: string
  ) => Promise<StorageDownloadFile['url'] | Error>
}