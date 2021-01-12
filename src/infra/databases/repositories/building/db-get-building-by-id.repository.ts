import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { BuildingData } from '@/data/models'
import { GetBuildingByIdRepository } from '@/data/repositories'

@Injectable('getBuildingByIdRepository')
export class DbGetBuildingByIdRepository implements GetBuildingByIdRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  getBuildingById = async (id: BuildingData['id']): Promise<BuildingData | null> => {
    return await this.db.getOne<BuildingData, 'id'>({
      collectionName: 'buildings',
      matchKey: 'id',
      matchValue: id
    })
  }
}
