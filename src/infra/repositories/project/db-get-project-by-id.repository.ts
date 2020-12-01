import { ProjectModel } from '@/data/models'
import { GetProjectByIdRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'
import { Inject, Injectable } from '@/shared/dependency-injection'

@Injectable('getProjectByIdRepository')
export class DbGetProjectByIdRepository implements GetProjectByIdRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  getProjectById = async (id: ProjectModel['id']): Promise<ProjectModel | null> => {
    return await this.db.getOneBy<ProjectModel, ProjectModel['id']>('id', id, 'projects')
  }
}