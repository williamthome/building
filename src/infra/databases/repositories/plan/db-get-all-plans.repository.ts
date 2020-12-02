import { Inject, Injectable } from '@/shared/dependency-injection'
import { PlanModel } from '@/data/models'
import { GetAllPlansRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('getAllPlansRepository')
export class DbGetAllPlansRepository implements GetAllPlansRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  getAllPlans = async (): Promise<PlanModel[]> => {
    return await this.db.getAll<PlanModel>('plans')
  }
}