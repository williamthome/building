import { Inject, Injectable } from '@/shared/dependency-injection'
import { PropertyModel } from '@/data/models'
import { UpdatePropertyRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'
import { PropertyModelDto } from '@/data/protocols'

@Injectable('updatePropertyRepository')
export class DbUpdatePropertyRepository implements UpdatePropertyRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  updateProperty = async (
    id: PropertyModel['id'],
    dto: PropertyModelDto
  ): Promise<PropertyModel | null> => {
    return await this.db.updateOne<PropertyModel>(id, dto, 'properties')
  }
}