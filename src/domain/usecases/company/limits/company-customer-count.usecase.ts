import { CustomerEntity } from '@/domain/entities'

export interface GetCompanyCustomerCountUseCase {
  call: (id: CustomerEntity['id']) => Promise<number>
}