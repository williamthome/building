import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { FileData, ProjectData } from '@/data/models'
import { GetAllProjectAttachmentsRepository } from '@/data/repositories'

@Injectable('getAllProjectAttachmentsRepository')
export class DbGetAllProjectAttachmentsRepository implements GetAllProjectAttachmentsRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  getAllProjectAttachments = async (id: ProjectData['id']): Promise<FileData[] | null> => {
    return await this.db.getMany<FileData, 'referenceId'>({
      collectionName: 'files',
      matchKey: 'referenceId',
      matchValue: id
    })
  }
}
