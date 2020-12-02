import { Inject, Injectable } from '@/shared/dependency-injection'
import { ProjectModel } from '@/data/models'
import { DeleteProjectRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('deleteProjectRepository')
export class DbDeleteProjectRepository implements DeleteProjectRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  deleteProject = async (projectId: ProjectModel['id']): Promise<ProjectModel | null> => {
    return await this.db.deleteOne<ProjectModel>(projectId, 'projects')
  }
}