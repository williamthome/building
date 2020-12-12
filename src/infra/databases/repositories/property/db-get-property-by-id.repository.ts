import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { PropertyData } from '@/data/models'
import { GetPropertyByIdRepository } from '@/data/repositories'

@Injectable('getPropertyByIdRepository')
export class DbGetPropertyByIdRepository implements GetPropertyByIdRepository {

  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  getPropertyById = async (id: PropertyData['id']): Promise<PropertyData | null> => {
    return await this.db.getOne<PropertyData, 'id'>({
      collectionName: 'properties',
      matchKey: 'id',
      matchValue: id
    })
  }
}