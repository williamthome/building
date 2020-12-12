// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { UpdateCompanyRepository } from '@/data/repositories'
// < Only Domain
import { Company, UpdateCompanyDto } from '@/domain/entities'
import { UpdateCompanyUseCase } from '@/domain/usecases'

@Injectable('updateCompanyUseCase')
export class UpdateCompanyContract implements UpdateCompanyUseCase {

  constructor (
    @Inject() private readonly updateCompanyRepository: UpdateCompanyRepository
  ) {}

  call = async (id: Company['id'], dto: UpdateCompanyDto): Promise<Company | null> => {
    return await this.updateCompanyRepository.updateCompany(id, dto)
  }
}