import { CustomerEntity } from '@/domain/entities'

export interface DeleteCustomerUseCase {
  call: (id: CustomerEntity['id']) => Promise<CustomerEntity | null>
}