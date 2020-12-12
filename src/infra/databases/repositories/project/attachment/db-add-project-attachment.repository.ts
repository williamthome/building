import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { CreateFileData, FileData, UploadProjectAttachmentData } from '@/data/models'
import { AddProjectAttachmentRepository } from '@/data/repositories'

@Injectable('addProjectAttachmentRepository')
export class DbAddProjectAttachmentRepository implements AddProjectAttachmentRepository {

  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  addProjectAttachment = async (dto: UploadProjectAttachmentData): Promise<FileData> => {
    return await this.db.addOne<CreateFileData, FileData>({
      collectionName: 'files',
      dto: {
        reference: 'projects',
        ...dto
      }
    })
  }
}