import { Customer, Company, CreateCustomerDto } from '@/domain/entities'

export interface AddCustomerUseCase {
  call: (dto: CreateCustomerDto, companyId: Company['id']) => Promise<Customer>
}
