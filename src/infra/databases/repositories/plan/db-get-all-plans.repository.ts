import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { PlanData } from '@/data/models'
import { GetAllPlansRepository } from '@/data/repositories'

@Injectable('getAllPlansRepository')
export class DbGetAllPlansRepository implements GetAllPlansRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  getAllPlans = async (): Promise<PlanData[]> => {
    return await this.db.getAll({
      collectionName: 'plans'
    })
  }
}
