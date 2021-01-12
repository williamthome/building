import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { ProjectData, UpdateProjectData } from '@/data/models'
import { UpdateProjectRepository } from '@/data/repositories'

@Injectable('updateProjectRepository')
export class DbUpdateProjectRepository implements UpdateProjectRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  updateProject = async (
    id: ProjectData['id'],
    dto: UpdateProjectData
  ): Promise<ProjectData | null> => {
    return await this.db.updateOne<ProjectData, 'id'>({
      collectionName: 'projects',
      matchKey: 'id',
      matchValue: id,
      dto
    })
  }
}
