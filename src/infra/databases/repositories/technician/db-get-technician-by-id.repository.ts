import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { TechnicianData } from '@/data/models'
import { GetTechnicianByIdRepository } from '@/data/repositories'

@Injectable('getTechnicianByIdRepository')
export class DbGetTechnicianByIdRepository implements GetTechnicianByIdRepository {

  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  getTechnicianById = async (id: TechnicianData['id']): Promise<TechnicianData | null> => {
    return await this.db.getOne<TechnicianData, 'id'>({
      collectionName: 'technicians',
      matchKey: 'id',
      matchValue: id
    })
  }
}