import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { PlanData } from '@/data/models'
import { GetPlanByIdRepository } from '@/data/repositories'

@Injectable('getPlanByIdRepository')
export class DbGetPlanByIdRepository implements GetPlanByIdRepository {

  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  getPlanById = async (id: PlanData['id']): Promise<PlanData | null> => {
    return await this.db.getOne<PlanData, 'id'>({
      collectionName: 'plans',
      matchKey: 'id',
      matchValue: id
    })
  }
}