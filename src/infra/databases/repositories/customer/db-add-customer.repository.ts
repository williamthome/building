import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { CreateCustomerData, CustomerData } from '@/data/models'
import { AddCustomerRepository } from '@/data/repositories'

@Injectable('addCustomerRepository')
export class DbAddCustomerRepository implements AddCustomerRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  addCustomer = async (dto: CreateCustomerData): Promise<CustomerData> => {
    return await this.db.addOne({
      collectionName: 'customers',
      dto
    })
  }
}
