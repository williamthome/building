import { CustomerEntity } from '@/domain/entities'

export interface GetCustomerByIdUseCase {
  call: (id: CustomerEntity['id']) => Promise<CustomerEntity | null>
}