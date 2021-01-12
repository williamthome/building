import { FileData } from '@/data/models'

export interface GetFilesByReferenceIdRepository {
  getFilesByReferenceId: (id: string) => Promise<FileData[]>
}
