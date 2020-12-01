import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { FileModel, ProjectModel } from '@/data/models'
import { AddProjectAttachmentRepository } from '@/data/repositories'
import { FileModelDto } from '@/data/protocols'

@Injectable('addProjectAttachmentRepository')
export class DbAddProjectAttachmentRepository implements AddProjectAttachmentRepository {

  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  addProjectAttachment = async (
    projectId: ProjectModel['id'],
    fileDto: FileModelDto
  ): Promise<FileModel> => {
    return await this.db.addOne<FileModel>(
      {
        reference: 'projects',
        referenceId: projectId,
        ...fileDto
      },
      'files'
    )
  }
}