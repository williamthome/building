import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { FileModel } from '@/data/models'
import { GetFilesByReferenceIdRepository } from '@/data/repositories'
import { Model } from '@/data/protocols'

@Injectable('getFilesByReferenceIdRepository')
export class DbGetFilesByReferenceIdRepository implements GetFilesByReferenceIdRepository {

  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  getFilesByReferenceId = async (id: Model['id']): Promise<FileModel[]> => {
    return await this.db.getManyBy<FileModel, Model['id']>('referenceId', id, 'files')
  }
}