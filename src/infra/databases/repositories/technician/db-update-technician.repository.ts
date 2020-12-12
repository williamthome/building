import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { TechnicianData, UpdateTechnicianData } from '@/data/models'
import { UpdateTechnicianRepository } from '@/data/repositories'

@Injectable('updateTechnicianRepository')
export class DbUpdateTechnicianRepository implements UpdateTechnicianRepository {

  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  updateTechnician = async (id: TechnicianData['id'], dto: UpdateTechnicianData): Promise<TechnicianData | null> => {
    return await this.db.updateOne<TechnicianData, 'id'>({
      collectionName: 'technicians',
      matchKey: 'id',
      matchValue: id,
      dto
    })
  }
}