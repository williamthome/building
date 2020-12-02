// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { UpdateCustomerRepository } from '@/data/repositories'
// < Only Domain
import { CustomerEntity } from '@/domain/entities'
import { UpdateCustomerUseCase } from '@/domain/usecases'
import { CustomerEntityDto } from '@/domain/protocols'

@Injectable('updateCustomerUseCase')
export class UpdateCustomerContract implements UpdateCustomerUseCase {

  constructor (
    @Inject() private readonly updateCustomerRepository: UpdateCustomerRepository
  ) {}

  call = async (id: CustomerEntity['id'], dto: CustomerEntityDto): Promise<CustomerEntity | null> => {
    return await this.updateCustomerRepository.updateCustomer(id, dto)
  }
}