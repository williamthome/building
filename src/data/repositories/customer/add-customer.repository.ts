import { CreateCustomerData, CustomerData } from '@/data/models'

export interface AddCustomerRepository {
  addCustomer: (dto: CreateCustomerData) => Promise<CustomerData>
}