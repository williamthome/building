import { Inject, Injectable } from '@/shared/dependency-injection'
import { ModelDto } from '@/data/protocols'
import { ProjectModel } from '@/data/models'
import { UpdateProjectRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('updateProjectRepository')
export class DbUpdateProjectRepository implements UpdateProjectRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  updateProject = async (
    projectId: ProjectModel['id'],
    projectDto: ModelDto<ProjectModel>
  ): Promise<ProjectModel | null> => {
    return await this.db.updateOne<ProjectModel>(projectId, projectDto, 'projects')
  }
}