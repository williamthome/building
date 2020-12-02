import { Inject, Injectable } from '@/shared/dependency-injection'
import { TechnicianModel } from '@/data/models'
import { AddTechnicianRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'
import { TechnicianModelDto } from '@/data/protocols'

@Injectable('addTechnicianRepository')
export class DbAddTechnicianRepository implements AddTechnicianRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  addTechnician = async (dto: TechnicianModelDto): Promise<TechnicianModel> => {
    return await this.db.addOne<TechnicianModel>(dto, 'technicians')
  }
}