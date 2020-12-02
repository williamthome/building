import { Inject, Injectable } from '@/shared/dependency-injection'
import { PhaseModel } from '@/data/models'
import { DeletePhaseRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('deletePhaseRepository')
export class DbDeletePhaseRepository implements DeletePhaseRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  deletePhase = async (phaseId: PhaseModel['id']): Promise<PhaseModel | null> => {
    return await this.db.deleteOne<PhaseModel>(phaseId, 'phases')
  }
}