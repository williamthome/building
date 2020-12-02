// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { GetCompanyCustomerCountRepository } from '@/data/repositories'
// < Only Domain
import { GetCompanyCustomerCountUseCase } from '@/domain/usecases'
import { CompanyEntity } from '@/domain/entities'

@Injectable('getCompanyCustomerCountUseCase')
export class GetCompanyCustomerCountContract implements GetCompanyCustomerCountUseCase {

  constructor (
    @Inject() private readonly getCompanyCustomerCountRepository: GetCompanyCustomerCountRepository
  ) {}

  call = async (id: CompanyEntity['id']): Promise<number> => {
    return await this.getCompanyCustomerCountRepository.getCompanyCustomerCount(id)
  }
}