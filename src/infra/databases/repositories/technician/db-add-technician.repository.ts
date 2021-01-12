import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { CreateTechnicianData, TechnicianData } from '@/data/models'
import { AddTechnicianRepository } from '@/data/repositories'

@Injectable('addTechnicianRepository')
export class DbAddTechnicianRepository implements AddTechnicianRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  addTechnician = async (dto: CreateTechnicianData): Promise<TechnicianData> => {
    return await this.db.addOne({
      collectionName: 'technicians',
      dto
    })
  }
}
