import { Inject, Injectable } from '@/shared/dependency-injection'
import { CustomerModel } from '@/data/models'
import { AddCustomerRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'
import { CustomerModelDto } from '@/data/protocols'

@Injectable('addCustomerRepository')
export class DbAddCustomerRepository implements AddCustomerRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  addCustomer = async (dto: CustomerModelDto): Promise<CustomerModel> => {
    return await this.db.addOne<CustomerModel>(dto, 'customers')
  }
}