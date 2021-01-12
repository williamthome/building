import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { GetCustomerByIdRepository } from '@/data/repositories'
import { CustomerData } from '@/data/models'

@Injectable('getCustomerByIdRepository')
export class DbGetCustomerByIdRepository implements GetCustomerByIdRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  getCustomerById = async (id: CustomerData['id']): Promise<CustomerData | null> => {
    return await this.db.getOne<CustomerData, 'id'>({
      collectionName: 'customers',
      matchKey: 'id',
      matchValue: id
    })
  }
}
