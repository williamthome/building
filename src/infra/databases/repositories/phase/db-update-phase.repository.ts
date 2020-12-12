import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { PhaseData, UpdatePhaseData } from '@/data/models'
import { UpdatePhaseRepository } from '@/data/repositories'

@Injectable('updatePhaseRepository')
export class DbUpdatePhaseRepository implements UpdatePhaseRepository {

  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  updatePhase = async (id: PhaseData['id'], dto: UpdatePhaseData): Promise<PhaseData | null> => {
    return await this.db.updateOne<PhaseData, 'id'>({
      collectionName: 'phases',
      matchKey: 'id',
      matchValue: id,
      dto
    })
  }
}