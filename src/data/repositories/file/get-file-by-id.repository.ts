import { FileModel } from '@/data/models'

export interface GetFileByIdRepository {
  getFileById: (id: FileModel['id']) => Promise<FileModel | null>
}