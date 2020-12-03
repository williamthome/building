import { FileEntity } from '@/domain/entities'
import { requestFileKeys, RequestFile, UploadFileResponse } from '../protocols'

const ByteConverter = {
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
  TB: 1024 * 1024 * 1024 * 1024
}

export const mbToBytes = (mb: number): number => mb * ByteConverter.MB

export const bytesToMB = (bytes: number): number => bytes * 0.00000095367432

export const isRequestFile = (obj: any): obj is RequestFile =>
  obj !== undefined && requestFileKeys.every(key => key in obj)

export const uploadResult = async (
  files: RequestFile[],
  referenceId: FileEntity['referenceId'],
  useCaseCall: (
    referenceId: FileEntity['referenceId'],
    mimeType: FileEntity['mimeType'],
    buffer: Buffer,
    fileName: FileEntity['name']
  ) => Promise<FileEntity | Error>
): Promise<UploadFileResponse> => {
  const result: UploadFileResponse = {
    uploads: [],
    errors: []
  }

  for (const file of files) {
    const uploaded = await useCaseCall(
      referenceId,
      file.mimeType,
      file.buffer,
      file.name
    )
    if (uploaded instanceof Error)
      result.errors.push({
        fileName: file.name,
        errorMessage: uploaded.message
      })
    else result.uploads.push(file.name)
  }

  return result
}