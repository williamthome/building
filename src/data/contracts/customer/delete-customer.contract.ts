// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { DeleteCustomerRepository } from '@/data/repositories'
// < Only Domain
import { Customer } from '@/domain/entities'
import { DeleteCustomerUseCase } from '@/domain/usecases'

@Injectable('deleteCustomerUseCase')
export class DeleteCustomerContract implements DeleteCustomerUseCase {

  constructor (
    @Inject() private readonly deleteCustomerRepository: DeleteCustomerRepository
  ) {}

  call = async (id: Customer['id']): Promise<Customer | null> => {
    const deletedCustomer = await this.deleteCustomerRepository.deleteCustomer(id)
    if (!deletedCustomer) return null
    return deletedCustomer
  }
}