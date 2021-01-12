import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { BuildingData, UpdateBuildingData } from '@/data/models'
import { UpdateBuildingRepository } from '@/data/repositories'

@Injectable('updateBuildingRepository')
export class DbUpdateBuildingRepository implements UpdateBuildingRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  updateBuilding = async (
    id: BuildingData['id'],
    dto: UpdateBuildingData
  ): Promise<BuildingData | null> => {
    return await this.db.updateOne<BuildingData, 'id'>({
      collectionName: 'buildings',
      matchKey: 'id',
      matchValue: id,
      dto
    })
  }
}
