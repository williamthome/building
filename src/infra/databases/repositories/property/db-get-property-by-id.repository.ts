import { PropertyModel } from '@/data/models'
import { GetPropertyByIdRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'
import { Inject, Injectable } from '@/shared/dependency-injection'

@Injectable('getPropertyByIdRepository')
export class DbGetPropertyByIdRepository implements GetPropertyByIdRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  getPropertyById = async (id: PropertyModel['id']): Promise<PropertyModel | null> => {
    return await this.db.getOneBy<PropertyModel, PropertyModel['id']>('id', id, 'properties')
  }
}