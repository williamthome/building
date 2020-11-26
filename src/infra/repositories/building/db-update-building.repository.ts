import { Inject, Injectable } from '@/shared/dependency-injection'
import { ModelDto } from '@/data/protocols'
import { BuildingModel } from '@/data/models'
import { UpdateBuildingRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('updateBuildingRepository')
export class DbUpdateBuildingRepository implements UpdateBuildingRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  updateBuilding = async (
    buildingId: BuildingModel['id'],
    buildingDto: ModelDto<BuildingModel>
  ): Promise<BuildingModel | null> => {
    return await this.db.updateOne<BuildingModel>(buildingId, buildingDto, 'buildings')
  }
}