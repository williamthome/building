import { Inject, Injectable } from '@/shared/dependency-injection'
import { BuildingModel } from '@/data/models'
import { DeleteBuildingRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('deleteBuildingRepository')
export class DbDeleteBuildingRepository implements DeleteBuildingRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  deleteBuilding = async (buildingId: BuildingModel['id']): Promise<BuildingModel | null> => {
    return await this.db.deleteOne<BuildingModel>(buildingId, 'buildings')
  }
}