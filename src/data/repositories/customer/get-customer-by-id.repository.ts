import { CustomerData } from '@/data/models'

export interface GetCustomerByIdRepository {
  getCustomerById: (id: CustomerData['id']) => Promise<CustomerData | null>
}
