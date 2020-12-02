// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { GetCompanyTechnicianCountRepository } from '@/data/repositories'
// < Only Domain
import { GetCompanyTechnicianCountUseCase } from '@/domain/usecases'
import { CompanyEntity } from '@/domain/entities'

@Injectable('getCompanyTechnicianCountUseCase')
export class GetCompanyTechnicianCountContract implements GetCompanyTechnicianCountUseCase {

  constructor (
    @Inject() private readonly getCompanyTechnicianCountRepository: GetCompanyTechnicianCountRepository
  ) {}

  call = async (id: CompanyEntity['id']): Promise<number> => {
    return await this.getCompanyTechnicianCountRepository.getCompanyTechnicianCount(id)
  }
}