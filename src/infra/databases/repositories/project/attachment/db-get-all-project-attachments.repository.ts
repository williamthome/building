import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { FileModel, ProjectModel } from '@/data/models'
import { GetAllProjectAttachmentsRepository } from '@/data/repositories'

@Injectable('getAllProjectAttachmentsRepository')
export class DbGetAllProjectAttachmentsRepository implements GetAllProjectAttachmentsRepository {

  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  getAllProjectAttachments = async (
    projectId: ProjectModel['id']
  ): Promise<FileModel[] | null> => {
    return await this.db.getManyBy<FileModel, ProjectModel['id']>('referenceId', projectId, 'files')
  }
}