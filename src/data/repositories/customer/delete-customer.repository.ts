import { CustomerData } from '@/data/models'

export interface DeleteCustomerRepository {
  deleteCustomer: (id: CustomerData['id']) => Promise<CustomerData | null>
}
