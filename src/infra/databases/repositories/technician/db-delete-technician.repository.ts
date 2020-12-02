import { Inject, Injectable } from '@/shared/dependency-injection'
import { TechnicianModel } from '@/data/models'
import { DeleteTechnicianRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('deleteTechnicianRepository')
export class DbDeleteTechnicianRepository implements DeleteTechnicianRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  deleteTechnician = async (id: TechnicianModel['id']): Promise<TechnicianModel | null> => {
    return await this.db.deleteOne<TechnicianModel>(id, 'technicians')
  }
}