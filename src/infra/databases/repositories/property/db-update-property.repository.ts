import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { PropertyData, UpdatePropertyData } from '@/data/models'
import { UpdatePropertyRepository } from '@/data/repositories'

@Injectable('updatePropertyRepository')
export class DbUpdatePropertyRepository implements UpdatePropertyRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  updateProperty = async (
    id: PropertyData['id'],
    dto: UpdatePropertyData
  ): Promise<PropertyData | null> => {
    return await this.db.updateOne<PropertyData, 'id'>({
      collectionName: 'properties',
      matchKey: 'id',
      matchValue: id,
      dto
    })
  }
}
