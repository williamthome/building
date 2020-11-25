import { Inject, Injectable } from '@/shared/dependency-injection'
import { ModelDto } from '@/data/protocols'
import { BuildingModel } from '@/data/models'
import { AddBuildingRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('addBuildingRepository')
export class DbAddBuildingRepository implements AddBuildingRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  addBuilding = async (buildingDto: ModelDto<BuildingModel>): Promise<BuildingModel> => {
    return await this.db.addOne<BuildingModel>(buildingDto, 'buildings')
  }
}