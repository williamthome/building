import { CustomerModel } from '@/data/models'
import { GetCustomerByIdRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'
import { Inject, Injectable } from '@/shared/dependency-injection'

@Injectable('getCustomerByIdRepository')
export class DbGetCustomerByIdRepository implements GetCustomerByIdRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  getCustomerById = async (id: CustomerModel['id']): Promise<CustomerModel | null> => {
    return await this.db.getOneBy<CustomerModel, CustomerModel['id']>('id', id, 'customers')
  }
}