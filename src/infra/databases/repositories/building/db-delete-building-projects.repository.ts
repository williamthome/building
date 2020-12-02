import { Inject, Injectable } from '@/shared/dependency-injection'
import { BuildingModel, ProjectModel } from '@/data/models'
import { DeleteBuildingProjectsRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('deleteBuildingProjectsRepository')
export class DbDeleteBuildingProjectsRepository implements DeleteBuildingProjectsRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  deleteBuildingProjects = async (buildingId: BuildingModel['id']): Promise<number> => {
    return await this.db.deleteMany<ProjectModel, 'buildingId'>('buildingId', buildingId, 'projects')
  }
}