import { CustomerModelDto } from '@/data/protocols'
import { CustomerModel } from '@/data/models'

export interface UpdateCustomerRepository {
  updateCustomer: (id: CustomerModel['id'], dto: CustomerModelDto) => Promise<CustomerModel | null>
}