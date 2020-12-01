import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { FileModel } from '@/data/models'
import { GetFileByIdRepository } from '@/data/repositories'

@Injectable('getFileByIdRepository')
export class DbGetFileByIdRepository implements GetFileByIdRepository {

  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  getFileById = async (id: FileModel['id']): Promise<FileModel | null> => {
    return await this.db.getOneBy<FileModel, FileModel['id']>('id', id, 'files')
  }
}