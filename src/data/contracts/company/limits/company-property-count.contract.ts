// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { GetCompanyPropertyCountRepository } from '@/data/repositories'
// < Only Domain
import { GetCompanyPropertyCountUseCase } from '@/domain/usecases'
import { CompanyEntity } from '@/domain/entities'

@Injectable('getCompanyPropertyCountUseCase')
export class GetCompanyPropertyCountContract implements GetCompanyPropertyCountUseCase {

  constructor (
    @Inject() private readonly getCompanyPropertyCountRepository: GetCompanyPropertyCountRepository
  ) {}

  call = async (id: CompanyEntity['id']): Promise<number> => {
    return await this.getCompanyPropertyCountRepository.getCompanyPropertyCount(id)
  }
}