import { File } from '../entities'

export type FileEntityResponse = Pick<File, 'id' | 'name' | 'mimeType' | 'sizeInBytes'>
