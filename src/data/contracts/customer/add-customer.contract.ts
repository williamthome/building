// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { AddCustomerRepository } from '@/data/repositories'
// < Only Domain
import { CustomerEntity, CompanyEntity } from '@/domain/entities'
import { AddCustomerUseCase } from '@/domain/usecases'
import { CustomerEntityDto } from '@/domain/protocols'

@Injectable('addCustomerUseCase')
export class AddCustomerContract implements AddCustomerUseCase {

  constructor (
    @Inject() private readonly addCustomerRepository: AddCustomerRepository
  ) { }

  call = async (
    dto: CustomerEntityDto,
    companyId: CompanyEntity['id']
  ): Promise<CustomerEntity> => {
    return await this.addCustomerRepository.addCustomer({
      ...dto,
      companyId
    })
  }
}