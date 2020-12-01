import { FileEntity } from '../entities'

export type FileResponse =
  | Pick<FileEntity,
    | 'id'
    | 'name'
    | 'mimeType'
    | 'sizeInBytes'
  >