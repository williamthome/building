import { Inject, Injectable } from '@/shared/dependency-injection'
import { PropertyModel } from '@/data/models'
import { DeletePropertyRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('deletePropertyRepository')
export class DbDeletePropertyRepository implements DeletePropertyRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  deleteProperty = async (id: PropertyModel['id']): Promise<PropertyModel | null> => {
    return await this.db.deleteOne<PropertyModel>(id, 'properties')
  }
}