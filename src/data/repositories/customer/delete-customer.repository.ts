import { CustomerModel } from '@/data/models'

export interface DeleteCustomerRepository {
  deleteCustomer: (id: CustomerModel['id']) => Promise<CustomerModel | null>
}