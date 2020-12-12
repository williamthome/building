import { Company, CreateCompanyDto } from '@/domain/entities'
import { AddCompanyUseCase } from '@/domain/usecases'
import { mockCompany } from '@/__tests__/domain/__mocks__/entities'

export class AddCompanyUseCaseSpy implements AddCompanyUseCase {
  dto?: CreateCompanyDto
  company?: Company
  shouldThrow = false

  call = async (dto: CreateCompanyDto): Promise<Company> => {
    this.dto = dto

    if (this.shouldThrow) throw new Error()

    this.company = mockCompany(dto)
    return this.company
  }
}