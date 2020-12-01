import { FileEntity } from '@/domain/entities'
import { UploadFileUseCase } from '@/domain/protocols'
import { requestFileKeys, RequestFile, UploadFileResponse } from '../protocols'

const ByteConverter = {
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
  TB: 1024 * 1024 * 1024 * 1024
}

export const mbToBytes = (mb: number): number => mb * ByteConverter.MB

export const isRequestFile = (obj: any): obj is RequestFile =>
  obj !== undefined && requestFileKeys.every(key => key in obj)

export const uploadResult = async (
  files: RequestFile[],
  referenceId: FileEntity['referenceId'],
  uploadUseCase: UploadFileUseCase
): Promise<UploadFileResponse> => {
  const result: UploadFileResponse = {
    uploads: [],
    errors: []
  }

  for (const file of files) {
    const uploaded = await uploadUseCase.call(
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