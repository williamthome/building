// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > Data
import { GetCustomerByIdRepository } from '@/data/repositories'
// < Only Domain
import { GetCustomerByIdUseCase } from '@/domain/usecases'
import { CustomerEntity } from '@/domain/entities'

@Injectable('getCustomerByIdUseCase')
export class GetCustomerByIdContract implements GetCustomerByIdUseCase {

  constructor (
    @Inject() private readonly getCustomerByIdRepository: GetCustomerByIdRepository
  ) {}

  call = async (id: CustomerEntity['id']): Promise<CustomerEntity | null> => {
    return await this.getCustomerByIdRepository.getCustomerById(id)
  }
}