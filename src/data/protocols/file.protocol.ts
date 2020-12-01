import { FileModel } from '../models'

export type FileModelDto = Pick<FileModel, 'name' | 'mimeType' | 'sizeInBytes'>