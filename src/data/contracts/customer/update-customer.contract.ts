// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { UpdateCustomerRepository } from '@/data/repositories'
// < Only Domain
import { Customer, UpdateCustomerDto } from '@/domain/entities'
import { UpdateCustomerUseCase } from '@/domain/usecases'

@Injectable('updateCustomerUseCase')
export class UpdateCustomerContract implements UpdateCustomerUseCase {

  constructor (
    @Inject() private readonly updateCustomerRepository: UpdateCustomerRepository
  ) {}

  call = async (id: Customer['id'], dto: UpdateCustomerDto): Promise<Customer | null> => {
    return await this.updateCustomerRepository.updateCustomer(id, dto)
  }
}