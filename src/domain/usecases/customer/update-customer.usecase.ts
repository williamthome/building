import { CustomerEntity } from '@/domain/entities'
import { CustomerEntityDto } from '@/domain/protocols'

export interface UpdateCustomerUseCase {
  call: (id: CustomerEntity['id'], dto: CustomerEntityDto) => Promise<CustomerEntity | null>
}