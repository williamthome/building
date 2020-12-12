import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { FileData } from '@/data/models'
import { GetFilesByReferenceIdRepository } from '@/data/repositories'

@Injectable('getFilesByReferenceIdRepository')
export class DbGetFilesByReferenceIdRepository implements GetFilesByReferenceIdRepository {

  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  getFilesByReferenceId = async (id: string): Promise<FileData[]> => {
    return await this.db.getMany<FileData, 'referenceId'>({
      collectionName: 'files',
      matchKey: 'referenceId',
      matchValue: id
    })
  }
}