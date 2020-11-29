// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { GetCompanyProjectCountRepository } from '@/data/repositories'
// < Only Domain
import { GetCompanyProjectCountUseCase } from '@/domain/usecases'
import { CompanyEntity } from '@/domain/entities'

@Injectable('getCompanyProjectCountUseCase')
export class GetCompanyProjectCountContract implements GetCompanyProjectCountUseCase {

  constructor (
    @Inject() private readonly getCompanyProjectCountRepository: GetCompanyProjectCountRepository
  ) {}

  call = async (id: CompanyEntity['id']): Promise<number> => {
    return await this.getCompanyProjectCountRepository.getCompanyProjectCount(id)
  }
}