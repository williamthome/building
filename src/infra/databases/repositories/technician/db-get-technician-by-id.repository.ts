import { TechnicianModel } from '@/data/models'
import { GetTechnicianByIdRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'
import { Inject, Injectable } from '@/shared/dependency-injection'

@Injectable('getTechnicianByIdRepository')
export class DbGetTechnicianByIdRepository implements GetTechnicianByIdRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  getTechnicianById = async (id: TechnicianModel['id']): Promise<TechnicianModel | null> => {
    return await this.db.getOneBy<TechnicianModel, TechnicianModel['id']>('id', id, 'technicians')
  }
}