import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { PropertyData } from '@/data/models'
import { DeletePropertyRepository } from '@/data/repositories'

@Injectable('deletePropertyRepository')
export class DbDeletePropertyRepository implements DeletePropertyRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  deleteProperty = async (id: PropertyData['id']): Promise<PropertyData | null> => {
    return await this.db.deleteOne<PropertyData, 'id'>({
      collectionName: 'properties',
      matchKey: 'id',
      matchValue: id
    })
  }
}
