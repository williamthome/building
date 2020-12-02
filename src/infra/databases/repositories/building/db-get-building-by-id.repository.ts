import { BuildingModel } from '@/data/models'
import { GetBuildingByIdRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'
import { Inject, Injectable } from '@/shared/dependency-injection'

@Injectable('getBuildingByIdRepository')
export class DbGetBuildingByIdRepository implements GetBuildingByIdRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  getBuildingById = async (id: BuildingModel['id']): Promise<BuildingModel | null> => {
    return await this.db.getOneBy<BuildingModel, BuildingModel['id']>('id', id, 'buildings')
  }
}