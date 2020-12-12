import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { CreatePropertyData, PropertyData } from '@/data/models'
import { AddPropertyRepository } from '@/data/repositories'

@Injectable('addPropertyRepository')
export class DbAddPropertyRepository implements AddPropertyRepository {

  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  addProperty = async (dto: CreatePropertyData): Promise<PropertyData> => {
    return await this.db.addOne({
      collectionName: 'properties',
      dto
    })
  }
}