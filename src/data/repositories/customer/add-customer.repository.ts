import { CustomerModelDto } from '@/data/protocols'
import { CustomerModel } from '@/data/models'

export interface AddCustomerRepository {
  addCustomer: (dto: CustomerModelDto) => Promise<CustomerModel>
}