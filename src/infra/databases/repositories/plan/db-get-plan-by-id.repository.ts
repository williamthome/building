import { Inject, Injectable } from '@/shared/dependency-injection'
import { PlanModel } from '@/data/models'
import { GetPlanByIdRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('getPlanByIdRepository')
export class DbGetPlanByIdRepository implements GetPlanByIdRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  getPlanById = async (id: PlanModel['id']): Promise<PlanModel | null> => {
    return await this.db.getOneBy<PlanModel, PlanModel['id']>('id', id, 'plans')
  }
}