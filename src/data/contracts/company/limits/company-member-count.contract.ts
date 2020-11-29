// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { GetCompanyMemberCountRepository } from '@/data/repositories'
// < Only Domain
import { GetCompanyMemberCountUseCase } from '@/domain/usecases'
import { CompanyEntity } from '@/domain/entities'

@Injectable('getCompanyMemberCountUseCase')
export class GetCompanyMemberCountContract implements GetCompanyMemberCountUseCase {

  constructor (
    @Inject() private readonly getCompanyMemberCountRepository: GetCompanyMemberCountRepository
  ) {}

  call = async (id: CompanyEntity['id']): Promise<number> => {
    return await this.getCompanyMemberCountRepository.getCompanyMemberCount(id)
  }
}