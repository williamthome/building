// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { UpdateCompanyRepository } from '@/data/repositories'
// < Only Domain
import { CompanyEntity } from '@/domain/entities'
import { UpdateCompanyUseCase } from '@/domain/usecases'
import { CompanyDto } from '@/domain/protocols'

@Injectable('updateCompanyUseCase')
export class UpdateCompanyContract implements UpdateCompanyUseCase {

  constructor (
    @Inject() private readonly updateCompanyRepository: UpdateCompanyRepository
  ) {}

  call = async (companyId: CompanyEntity['id'],companyDto: CompanyDto): Promise<CompanyEntity | null> => {
    return await this.updateCompanyRepository.updateCompany(companyId, companyDto)
  }
}