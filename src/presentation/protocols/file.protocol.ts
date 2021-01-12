export interface RequestFile {
  name: string
  buffer: Buffer
  mimeType: string
}

export const requestFileKeys: Array<keyof RequestFile> = ['name', 'buffer', 'mimeType']

interface UploadErrorResponse {
  fileName: RequestFile['name']
  errorMessage: Error['message']
}

export interface UploadFileResponse {
  uploads: string[]
  errors: UploadErrorResponse[]
}
