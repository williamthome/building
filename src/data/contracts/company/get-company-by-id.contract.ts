// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > Data
import { GetCompanyByIdRepository } from '@/data/repositories'
// < Only Domain
import { GetCompanyByIdUseCase } from '@/domain/usecases'
import { CompanyEntity } from '@/domain/entities'

@Injectable('getCompanyByIdUseCase')
export class GetCompanyByIdContract implements GetCompanyByIdUseCase {

  constructor (
    @Inject() private readonly getCompanyByIdRepository: GetCompanyByIdRepository
  ) {}

  call = async (id: CompanyEntity['id']): Promise<CompanyEntity | null> => {
    return await this.getCompanyByIdRepository.getCompanyById(id)
  }
}