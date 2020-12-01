import { StorageDownloadFile, StorageUploadFile } from '@/data/protocols'

export interface Storage {
  upload: (
    file: StorageUploadFile,
    buffer: StorageDownloadFile['buffer'],
    fileName: string
  ) => Promise<StorageDownloadFile['url'] | Error>

  download: (
    url: StorageDownloadFile['url']
  ) => Promise<StorageDownloadFile | null>
}