import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { PhaseData } from '@/data/models'
import { DeletePhaseRepository } from '@/data/repositories'

@Injectable('deletePhaseRepository')
export class DbDeletePhaseRepository implements DeletePhaseRepository {

  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  deletePhase = async (id: PhaseData['id']): Promise<PhaseData | null> => {
    return await this.db.deleteOne<PhaseData, 'id'>({
      collectionName: 'phases',
      matchKey: 'id',
      matchValue: id
    })
  }
}