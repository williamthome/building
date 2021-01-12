import { Customer } from '@/domain/entities'

export interface DeleteCustomerUseCase {
  call: (id: Customer['id']) => Promise<Customer | null>
}
