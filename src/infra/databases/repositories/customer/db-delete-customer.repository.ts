import { Inject, Injectable } from '@/shared/dependency-injection'
import { CustomerModel } from '@/data/models'
import { DeleteCustomerRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('deleteCustomerRepository')
export class DbDeleteCustomerRepository implements DeleteCustomerRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  deleteCustomer = async (id: CustomerModel['id']): Promise<CustomerModel | null> => {
    return await this.db.deleteOne<CustomerModel>(id, 'customers')
  }
}