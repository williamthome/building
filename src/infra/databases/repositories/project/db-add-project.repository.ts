import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { CreateProjectData, ProjectData } from '@/data/models'
import { AddProjectRepository } from '@/data/repositories'

@Injectable('addProjectRepository')
export class DbAddProjectRepository implements AddProjectRepository {

  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  addProject = async (dto: CreateProjectData): Promise<ProjectData> => {
    return await this.db.addOne({
      collectionName: 'projects',
      dto
    })
  }
}