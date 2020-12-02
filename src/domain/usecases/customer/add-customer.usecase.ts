import { CustomerEntity, CompanyEntity } from '@/domain/entities'
import { CustomerEntityDto } from '@/domain/protocols'

export interface AddCustomerUseCase {
  call: (
    dto: CustomerEntityDto,
    companyId: CompanyEntity['id']
  ) => Promise<CustomerEntity>
}