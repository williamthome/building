import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { CreatePhaseData, PhaseData } from '@/data/models'
import { AddPhaseRepository } from '@/data/repositories'

@Injectable('addPhaseRepository')
export class DbAddPhaseRepository implements AddPhaseRepository {

  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  addPhase = async (dto: CreatePhaseData): Promise<PhaseData> => {
    return await this.db.addOne({
      collectionName: 'phases',
      dto
    })
  }
}