import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { ProjectData } from '@/data/models'
import { DeleteProjectRepository } from '@/data/repositories'

@Injectable('deleteProjectRepository')
export class DbDeleteProjectRepository implements DeleteProjectRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  deleteProject = async (id: ProjectData['id']): Promise<ProjectData | null> => {
    return await this.db.deleteOne<ProjectData, 'id'>({
      collectionName: 'projects',
      matchKey: 'id',
      matchValue: id
    })
  }
}
