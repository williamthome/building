import { CompanyEntity } from '@/domain/entities'
import { CompanyDto } from '@/domain/protocols'
import { AddCompanyUseCase } from '@/domain/usecases'
import { mockCompanyEntity } from '@/__tests__/domain/__mocks__/entities'

export class AddCompanyUseCaseSpy implements AddCompanyUseCase {
  companyDto?:  CompanyDto
  companyEntity?: CompanyEntity
  shouldThrow = false

  call = async (companyDto: CompanyDto): Promise<CompanyEntity> => {
    this.companyDto = companyDto

    if (this.shouldThrow) throw new Error()

    this.companyEntity = mockCompanyEntity(companyDto)
    return this.companyEntity
  }
}