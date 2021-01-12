import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { CustomerData, UpdateCustomerData } from '@/data/models'
import { UpdateCustomerRepository } from '@/data/repositories'

@Injectable('updateCustomerRepository')
export class DbUpdateCustomerRepository implements UpdateCustomerRepository {
  constructor(@Inject('db') private readonly db: Database) {}

  updateCustomer = async (
    id: CustomerData['id'],
    dto: UpdateCustomerData
  ): Promise<CustomerData | null> => {
    return await this.db.updateOne<CustomerData, 'id'>({
      collectionName: 'customers',
      matchKey: 'id',
      matchValue: id,
      dto
    })
  }
}
