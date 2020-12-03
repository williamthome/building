import { FileEntity } from '../entities'

export type FileEntityResponse =
  | Pick<FileEntity,
    | 'id'
    | 'name'
    | 'mimeType'
    | 'sizeInBytes'
  >