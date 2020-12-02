import { Inject, Injectable } from '@/shared/dependency-injection'
import { PropertyModel } from '@/data/models'
import { AddPropertyRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'
import { PropertyModelDto } from '@/data/protocols'

@Injectable('addPropertyRepository')
export class DbAddPropertyRepository implements AddPropertyRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  addProperty = async (dto: PropertyModelDto): Promise<PropertyModel> => {
    return await this.db.addOne<PropertyModel>(dto, 'properties')
  }
}