import { Customer } from '@/domain/entities'

export interface GetCustomerByIdUseCase {
  call: (id: Customer['id']) => Promise<Customer | null>
}
