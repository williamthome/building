import { Customer, UpdateCustomerDto } from '@/domain/entities'

export interface UpdateCustomerUseCase {
  call: (id: Customer['id'], dto: UpdateCustomerDto) => Promise<Customer | null>
}
