import { CustomerModel } from '@/data/models'

export interface GetCustomerByIdRepository {
  getCustomerById: (id: CustomerModel['id']) => Promise<CustomerModel | null>
}