import { FileData } from '@/data/models'

export interface GetFileByIdRepository {
  getFileById: (id: FileData['id']) => Promise<FileData | null>
}