import { Inject, Injectable } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { CustomerData } from '@/data/models'
import { DeleteCustomerRepository } from '@/data/repositories'

@Injectable('deleteCustomerRepository')
export class DbDeleteCustomerRepository implements DeleteCustomerRepository {

  constructor (
    @Inject('db') private readonly db: Database
  ) { }

  deleteCustomer = async (id: CustomerData['id']): Promise<CustomerData | null> => {
    return await this.db.deleteOne<CustomerData, 'id'>({
      collectionName: 'customers',
      matchKey: 'id',
      matchValue: id
    })
  }
}