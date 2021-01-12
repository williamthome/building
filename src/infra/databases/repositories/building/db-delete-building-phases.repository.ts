import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { BuildingData, PhaseData } from '@/data/models'
import { DeleteBuildingPhasesRepository } from '@/data/repositories'

@Injectable('deleteBuildingPhasesRepository')
export class DbDeleteBuildingPhasesRepository implements DeleteBuildingPhasesRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  deleteBuildingPhases = async (id: BuildingData['id']): Promise<number> => {
    return await this.db.deleteMany<PhaseData, 'buildingId'>({
      collectionName: 'phases',
      matchKey: 'buildingId',
      matchValue: id
    })
  }
}
