import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { BuildingData, ProjectData } from '@/data/models'
import { DeleteBuildingProjectsRepository } from '@/data/repositories'

@Injectable('deleteBuildingProjectsRepository')
export class DbDeleteBuildingProjectsRepository implements DeleteBuildingProjectsRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  deleteBuildingProjects = async (id: BuildingData['id']): Promise<number> => {
    return await this.db.deleteMany<ProjectData, 'buildingId'>({
      collectionName: 'projects',
      matchKey: 'buildingId',
      matchValue: id
    })
  }
}