import { File, UploadProjectAttachmentDto } from '@/domain/entities'
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
  referenceId: File['referenceId'],
  useCaseCall: (
    dto: UploadProjectAttachmentDto,
    buffer: Buffer
  ) => Promise<File | Error>
): Promise<UploadFileResponse> => {
  const result: UploadFileResponse = {
    uploads: [],
    errors: []
  }

  for (const file of files) {
    const uploaded = await useCaseCall(
      {
        referenceId,
        mimeType: file.mimeType,
        name: file.name,
        sizeInBytes: file.buffer.byteLength
      },
      file.buffer
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