// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { AddCustomerRepository } from '@/data/repositories'
// < Only Domain
import { Customer, Company, CreateCustomerDto } from '@/domain/entities'
import { AddCustomerUseCase } from '@/domain/usecases'

@Injectable('addCustomerUseCase')
export class AddCustomerContract implements AddCustomerUseCase {

  constructor (
    @Inject() private readonly addCustomerRepository: AddCustomerRepository
  ) { }

  call = async (dto: CreateCustomerDto, companyId: Company['id']): Promise<Customer> => {
    return await this.addCustomerRepository.addCustomer({
      ...dto,
      companyId
    })
  }
}