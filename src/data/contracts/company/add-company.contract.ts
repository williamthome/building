// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { AddCompanyRepository } from '@/data/repositories/company'
// < Only Domain
import { CompanyEntity } from '@/domain/entities'
import { AddCompanyUseCase } from '@/domain/usecases/company'
import { CompanyDto } from '@/domain/protocols'

@Injectable('addCompanyUseCase')
export class AddCompanyContract implements AddCompanyUseCase {

  constructor (
    @Inject() private readonly addCompanyRepository: AddCompanyRepository
  ) {}

  call = async (companyDto: CompanyDto): Promise<CompanyEntity> => {
    return await this.addCompanyRepository.addCompany(companyDto)
  }
}