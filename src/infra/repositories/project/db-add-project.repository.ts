import { Inject, Injectable } from '@/shared/dependency-injection'
import { ModelDto } from '@/data/protocols'
import { ProjectModel } from '@/data/models'
import { AddProjectRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('addProjectRepository')
export class DbAddProjectRepository implements AddProjectRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  addProject = async (projectDto: ModelDto<ProjectModel>): Promise<ProjectModel> => {
    return await this.db.addOne<ProjectModel>(projectDto, 'projects')
  }
}