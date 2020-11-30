import { Inject, Injectable } from '@/shared/dependency-injection'
import { BuildingModel } from '@/data/models'
import { AddBuildingRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'
import { BuildingModelDto } from '@/data/protocols'

@Injectable('addBuildingRepository')
export class DbAddBuildingRepository implements AddBuildingRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  addBuilding = async (buildingDto: BuildingModelDto): Promise<BuildingModel> => {
    return await this.db.addOne<BuildingModel>(buildingDto, 'buildings')
  }
}