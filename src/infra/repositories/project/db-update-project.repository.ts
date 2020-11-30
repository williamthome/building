import { Inject, Injectable } from '@/shared/dependency-injection'
import { ProjectModel } from '@/data/models'
import { UpdateProjectRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'
import { ProjectModelDto } from '@/data/protocols'

@Injectable('updateProjectRepository')
export class DbUpdateProjectRepository implements UpdateProjectRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  updateProject = async (
    projectId: ProjectModel['id'],
    projectDto: ProjectModelDto
  ): Promise<ProjectModel | null> => {
    return await this.db.updateOne<ProjectModel>(projectId, projectDto, 'projects')
  }
}