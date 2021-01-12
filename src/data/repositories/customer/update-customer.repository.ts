import { CustomerData, UpdateCustomerData } from '@/data/models'

export interface UpdateCustomerRepository {
  updateCustomer: (id: CustomerData['id'], dto: UpdateCustomerData) => Promise<CustomerData | null>
}
