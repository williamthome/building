import { Inject, Injectable } from '@/shared/dependency-injection'
import { CustomerModel } from '@/data/models'
import { UpdateCustomerRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'
import { CustomerModelDto } from '@/data/protocols'

@Injectable('updateCustomerRepository')
export class DbUpdateCustomerRepository implements UpdateCustomerRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  updateCustomer = async (
    id: CustomerModel['id'],
    dto: CustomerModelDto
  ): Promise<CustomerModel | null> => {
    return await this.db.updateOne<CustomerModel>(id, dto, 'customers')
  }
}