import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { GetFileByIdRepository } from '@/data/repositories'
import { FileData } from '@/data/models'

@Injectable('getFileByIdRepository')
export class DbGetFileByIdRepository implements GetFileByIdRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  getFileById = async (id: FileData['id']): Promise<FileData | null> => {
    return await this.db.getOne<FileData, 'id'>({
      collectionName: 'files',
      matchKey: 'id',
      matchValue: id
    })
  }
}
