import { Model } from '@/data/protocols'
import { FileModel } from '@/data/models'

export interface GetFilesByReferenceIdRepository {
  getFilesByReferenceId: (id: Model['id']) => Promise<FileModel[]>
}