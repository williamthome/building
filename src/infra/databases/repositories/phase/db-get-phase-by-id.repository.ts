import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { PhaseData } from '@/data/models'
import { GetPhaseByIdRepository } from '@/data/repositories'

@Injectable('getPhaseByIdRepository')
export class DbGetPhaseByIdRepository implements GetPhaseByIdRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  getPhaseById = async (id: PhaseData['id']): Promise<PhaseData | null> => {
    return await this.db.getOne<PhaseData, 'id'>({
      collectionName: 'phases',
      matchKey: 'id',
      matchValue: id
    })
  }
}
