import { Inject, Injectable } from '@/shared/dependency-injection'
import { ProjectModel } from '@/data/models'
import { AddProjectRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'
import { ProjectModelDto } from '@/data/protocols'

@Injectable('addProjectRepository')
export class DbAddProjectRepository implements AddProjectRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  addProject = async (projectDto: ProjectModelDto): Promise<ProjectModel> => {
    return await this.db.addOne<ProjectModel>(projectDto, 'projects')
  }
}