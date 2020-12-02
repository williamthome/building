import { PhaseModel } from '@/data/models'
import { GetPhaseByIdRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'
import { Inject, Injectable } from '@/shared/dependency-injection'

@Injectable('getPhaseByIdRepository')
export class DbGetPhaseByIdRepository implements GetPhaseByIdRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  getPhaseById = async (id: PhaseModel['id']): Promise<PhaseModel | null> => {
    return await this.db.getOneBy<PhaseModel, PhaseModel['id']>('id', id, 'phases')
  }
}