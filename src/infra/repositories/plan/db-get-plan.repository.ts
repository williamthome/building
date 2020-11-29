import { Inject, Injectable } from '@/shared/dependency-injection'
import { PlanModel } from '@/data/models'
import { GetPlanRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('getPlanRepository')
export class DbGetPlanRepository implements GetPlanRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  getPlan = async (id: PlanModel['id']): Promise<PlanModel | null> => {
    return await this.db.getOneBy<PlanModel, PlanModel['id']>('id', id, 'plans')
  }
}