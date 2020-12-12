import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { BuildingData } from '@/data/models'
import { DeleteBuildingRepository } from '@/data/repositories'

@Injectable('deleteBuildingRepository')
export class DbDeleteBuildingRepository implements DeleteBuildingRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  deleteBuilding = async (buildingId: BuildingData['id']): Promise<BuildingData | null> => {
    return await this.db.deleteOne<BuildingData, 'id'>({
      collectionName: 'buildings',
      matchKey: 'id',
      matchValue: buildingId
    })
  }
}