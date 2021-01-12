import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { CreateBuildingData, BuildingData } from '@/data/models'
import { AddBuildingRepository } from '@/data/repositories'

@Injectable('addBuildingRepository')
export class DbAddBuildingRepository implements AddBuildingRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  addBuilding = async (dto: CreateBuildingData): Promise<BuildingData> => {
    return await this.db.addOne({
      collectionName: 'buildings',
      dto
    })
  }
}
