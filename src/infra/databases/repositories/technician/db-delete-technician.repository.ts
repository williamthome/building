import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { TechnicianData } from '@/data/models'
import { DeleteTechnicianRepository } from '@/data/repositories'

@Injectable('deleteTechnicianRepository')
export class DbDeleteTechnicianRepository implements DeleteTechnicianRepository {

  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  deleteTechnician = async (id: TechnicianData['id']): Promise<TechnicianData | null> => {
    return await this.db.deleteOne<TechnicianData, 'id'>({
      collectionName: 'technicians',
      matchKey: 'id',
      matchValue: id
    })
  }
}