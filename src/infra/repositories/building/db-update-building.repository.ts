import { Inject, Injectable } from '@/shared/dependency-injection'
import { BuildingModel } from '@/data/models'
import { UpdateBuildingRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'
import { BuildingModelDto } from '@/data/protocols'

@Injectable('updateBuildingRepository')
export class DbUpdateBuildingRepository implements UpdateBuildingRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  updateBuilding = async (
    buildingId: BuildingModel['id'],
    buildingDto: BuildingModelDto
  ): Promise<BuildingModel | null> => {
    return await this.db.updateOne<BuildingModel>(buildingId, buildingDto, 'buildings')
  }
}