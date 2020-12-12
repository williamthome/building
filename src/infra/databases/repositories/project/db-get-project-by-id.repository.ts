import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { ProjectData } from '@/data/models'
import { GetProjectByIdRepository } from '@/data/repositories'

@Injectable('getProjectByIdRepository')
export class DbGetProjectByIdRepository implements GetProjectByIdRepository {

  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  getProjectById = async (id: ProjectData['id']): Promise<ProjectData | null> => {
    return await this.db.getOne<ProjectData, 'id'>({
      collectionName: 'projects',
      matchKey: 'id',
      matchValue: id
    })
  }
}