import { Inject, Injectable } from '@/shared/dependency-injection'
import { BuildingModel, PhaseModel } from '@/data/models'
import { DeleteBuildingPhasesRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('deleteBuildingPhasesRepository')
export class DbDeleteBuildingPhasesRepository implements DeleteBuildingPhasesRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  deleteBuildingPhases = async (buildingId: BuildingModel['id']): Promise<number> => {
    return await this.db.deleteMany<PhaseModel, 'buildingId'>('buildingId', buildingId, 'phases')
  }
}